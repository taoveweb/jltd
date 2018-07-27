import * as React from 'react';
import { Alert } from 'antd';

interface JltAlertProps {
  message: React.ReactNode;
}
class JltAlert extends React.Component<JltAlertProps, {}> {
  render() {
    return <Alert message={this.props.message} {...this.props} />;
  }
}
export default JltAlert;
