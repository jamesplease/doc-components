import React from 'react';
import PropTypes from 'prop-types';
import { fetchDedupe } from 'fetch-dedupe';
import exampleCodeUrl from './example.txt';

export default class CodeManager extends React.Component {
  render() {
    const { children } = this.props;
    const { code } = this.state;

    if (code === null) {
      return null;
    }

    return children({
      code,
      handleCodeChange: this.handleCodeChange
    });
  }

  static propTypes = {
    codeTextUrl: PropTypes.string,
  };

  static defaultProps = {
    codeTextUrl: exampleCodeUrl,
  }

  state = {
    code: null
  };

  handleCodeChange = code => {
    this.setState({ code });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.codeTextUrl !== nextProps.codeTextUrl) {
      this.fetchCode(nextProps);
    }
  }

  componentDidMount() {
    this.fetchCode();
  }

  fetchCode = props => {
    const { codeTextUrl } = props || this.props;

    fetchDedupe(codeTextUrl, { responseType: 'text' }).then(res => {
      this.setState({
        code: res.data
      });
    });
  };
}
