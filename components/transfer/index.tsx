import * as React from 'react';
import { Transfer } from 'antd';

interface TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}
interface TransferProps {
  dataSource: TransferItem[];
}
class JltTransfer extends React.Component<TransferProps, any> {
  render() {
    return <Transfer dataSource={this.props.dataSource} {...this.props} />;
  }
}

export default JltTransfer;
