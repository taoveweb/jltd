import * as React from 'react';
import { Modal } from 'antd';

const ModalComponent = (props:any) => {
  const { visible, onConfirm, onCancel, title, child, width, okText } = props;
  return (
    <Modal
      width={width || '50%'}
      okText={okText || '确认'}
      cancelText="取消"
      title={title}
      visible={visible}
      maskClosable={false}
      onOk={onConfirm}
      onCancel={onCancel}
      closable
    >
      {child}
    </Modal>
  );
};

export default ModalComponent;
