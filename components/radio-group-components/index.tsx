import * as React from 'react';
import { Radio, } from 'antd';
// import update from 'immutability-helper';
// import { Select } from 'antd';
import url from '../_util/url';
import * as $ from 'jquery';

const RadioGroup = Radio.Group;
export interface RadioGroupComponentsProps {
    codeType:any,
    onChange?:(e?: any) => void;
    disabled?:boolean,
    value?: any,
    defaultValue?: any
}
export interface RadioGroupComponentsState {
    dataDictionaryList : Array<any>,
    loading : boolean
}
class RadioGroupComponents extends React.Component<RadioGroupComponentsProps,RadioGroupComponentsState> {
    constructor(props:RadioGroupComponentsProps) {
        super(props);

        this.state = {
            dataDictionaryList: [],
            loading: false,
        };
    }

    componentWillMount() {
        this.searchTemplateForState();
    }

    // 用state信息搜索模板
    searchTemplateForState = () => {
        const {codeType} = this.props;
        var self = this;

        this.setState({
            loading: true,
        });
        $.ajax({
            url: url.cdDictionary.getDataDictionary,
            data: { "codeType": codeType },
            cache: false,
            async : false,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if (data.result) {
                    self.setState({
                        dataDictionaryList: data.data,
                        loading: false,
                    });
                } else {
                    self.setState(() => {
                        return {
                            loading: false,
                        };
                    });
                }
            }
        });
    };

    render() {
    	const renderRadio = (this.state.dataDictionaryList || []).map(data => {
			return (
				<Radio value={data.key}>{data.label}</Radio>
			);
		});

        return (
            <div>
            <RadioGroup onChange={e => { this.props.onChange == null ? "" : this.props.onChange(e.target.value) }}
            			disabled={this.props.disabled} 
            			value={this.props.value} 
            			defaultValue={this.props.defaultValue}>
				{renderRadio}
			</RadioGroup>
            </div>
        );
    }
}
export default RadioGroupComponents;
