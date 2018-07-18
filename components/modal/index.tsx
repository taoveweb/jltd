import * as React from 'react';
import { Modal } from 'antd';
 
 const confirm  =Modal.confirm ;
 
 class JltModal extends React.Component{
    static confirm: typeof confirm;
   
    render() {
        return (
            <Modal {...this.props}/>
        )
    }
}

JltModal.confirm = confirm;
export default JltModal;