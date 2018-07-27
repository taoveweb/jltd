import * as React from 'react';
import { Cascader } from 'antd';

interface CascaderOptionType {
    value?: string;
    label?: React.ReactNode;
    disabled?: boolean;
    children?: Array<CascaderOptionType>;
    [key: string]: any;
}

interface CascaderProps {
    options: CascaderOptionType[];
}

 class JltCascader extends React.Component<CascaderProps,any>{
    render() {
        return (
            <Cascader options={this.props.options} {...this.props} />
        )
    }
}
export default JltCascader;