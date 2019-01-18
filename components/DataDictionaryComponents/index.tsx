import * as React from 'react';
import { Select } from 'antd';
import * as $ from 'jquery';
const styles = require('./DataDictionaryComponents.less');

import url from '../_util/url';
const Option = Select.Option;
type DataDictionaryComponentsState = {
  dataDictionaryList: undefined[];
  loading: boolean;
};
interface DataDictionaryComponentsprops {
  codeType?: any;
  dropdownMatchSelectWidth?: any;
  style?: any;
  placeholder?: any;
  value?: any;
  disabled?: any;
  allowClear?: any;
  defaultValue?: any;
  onChange?: any;
  className?: any;
  mode?: any;
  editable?: any;
}
// 数据字典
class DataDictionaryComponents extends React.Component<
  DataDictionaryComponentsprops,
  DataDictionaryComponentsState
> {
  constructor(props: DataDictionaryComponentsprops) {
    super(props);
    this.state = {
      dataDictionaryList: [],
      loading: false,
    };
  }
  componentWillMount() {
    this.searchTemplateForState();
  }
  // 用state信息搜索模板----------&&&&&&&&&&&&&&&&重写
  searchTemplateForState = () => {
    const { codeType } = this.props;
    const self = this;
    this.setState({
      loading: true,
    });
    $.ajax({
      url: url.cdDictionary.getDataDictionary,
      data: { codeType },
      cache: false,
      async: false,
      type: 'POST',
      dataType: 'json',
      success(data: any) {
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
      },
    });
  };
  render() {
    const { editable } = this.props;
    const renderOption = this.state.dataDictionaryList.map((option: any) => {
      return (
        <Option key={option.key} value={option.key}>
          {option.label}
        </Option>
      );
    });
    const dataDictionaryMap: any = [];
    this.state.dataDictionaryList.forEach((info: any) => {
      dataDictionaryMap[info.key] = info.label;
    });
    const text = dataDictionaryMap[this.props.value];
    return (
      <div>
        {editable || editable == null ? (
          <Select
            {...this.props}
            disabled={
              this.props.disabled === true || this.props.disabled === 'true'
            }
            value={this.props.value}
            allowClear={this.props.allowClear}
            placeholder={this.props.placeholder}
            defaultValue={this.props.defaultValue}
            className={this.props.className || styles['view-style']}
            style={this.props.style}
            onChange={this.props.onChange}
            dropdownMatchSelectWidth={
              this.props.dropdownMatchSelectWidth === undefined
                ? true
                : this.props.dropdownMatchSelectWidth
            }
            mode={this.props.mode ? this.props.mode : ''}
          >
            {renderOption}
          </Select>
        ) : (
          <span>{text}</span>
        )}
      </div>
    );
  }
}
export default DataDictionaryComponents;
