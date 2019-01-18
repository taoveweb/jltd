import * as React from 'react';
import Modal from '../modal'
import Progress from '../progress'
class JProgress extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <Modal
        {...this.props}
        title=""
        mask={false}
        style={{ top: '50%', marginTop: -40 }}
        closable={false}
        footer={null}
      >
        <Progress percent={parseInt(this.props.percent)} />
      </Modal>
    );
  }
}
export default JProgress