import * as React from 'react';
import { Upload } from 'antd';
 
 const Dragger = Upload.Dragger;
 class JltUpload extends React.Component{
     static Dragger : typeof Dragger;
    render() {
        return (
            <Upload {...this.props}/>
        )
    }
}
JltUpload.Dragger =Dragger;
export default JltUpload;