import * as React from 'react';
import { Form } from 'antd';
 
 const Item =Form.Item;
 const createFormField =Form.createFormField;
 const create = Form.create;
 class JltForm extends React.Component{
    static Item: typeof Item;
    static createFormField: typeof createFormField;
    static create :typeof create;
    render() {
        return (
            <Form  {...this.props}/>
        )
    }
}
JltForm.Item = Item;
JltForm.createFormField = createFormField;
JltForm.create = create;
export default JltForm;