import React from 'react';
import PropTypes from 'prop-types';
import { fetchDedupe } from 'fetch-dedupe';

const defaultCode = `class Example extends Component {
  render () {
    return (
      <div>
        This is the default code provided by the CodeManager component.
      </div>
    );
  }
}

return <Example />;`;

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
    codeTextUrl: null,
  }

  state = {
    code: null
  };

  handleCodeChange = code => {
    this.setState({ code });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.codeTextUrl !== nextProps.codeTextUrl) {
      if (nextProps.codeTextUrl) {
        this.fetchCode(nextProps);
      }
    }
  }

  componentDidMount() {
    if (this.props.codeTextUrl) {
      this.fetchCode();
    }
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
