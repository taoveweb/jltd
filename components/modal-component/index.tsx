import * as React from 'react';
import { Modal } from 'antd';
export interface  ModalComponentProps {
  visible?:boolean,
  onConfirm?:(e?:any)=>void,
  onCancel?:(e?:any)=>void,
  title?:any,
  child?:any, 
  width?:any,
  okText?:any,
  style?:any,
}
const ModalComponent = (props:ModalComponentProps) => {
  const { visible, onConfirm, onCancel, title, child, width, okText,style } = props;
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
      style={style||''}
    >
      {child}
    </Modal>
  );
};

export default ModalComponent;
