import * as React from 'react';
import { Select } from 'antd';
// @ts-ignore
import fetch from 'dva/fetch';
import classnames from 'classnames';

const Option = Select.Option;

class JSelect extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataList: [],
    };
  }

  componentDidMount() {
    const { requestUrl, requestType, params, headers } = this.props;
    const rurl = requestUrl || '../system/getDataDictionary';
    const rType = requestType ? requestType.toUpperCase() : 'POST';
    this.getSelectDate(rurl, params, rType, headers);
  }

  changeData = (data: any = {}) => {
    let { requestUrl, requestType, params, headers } = data;
    this.getSelectDate(
      requestUrl || this.props.requestUrl,
      params || this.props.params,
      requestType || this.props.requestType,
      headers || this.props.headers
    );
  };

  getSelectDate = (_url: string, _params: any = {}, _type: string, headers: any = {}) => {
    const newOptions: any = {
      credentials: 'include',
      method: _type,
      headers: headers,
      body: _params,
    };
    if (_type === 'POST') {
      if (!(_params instanceof FormData)) {
        if (this.props.dataType === 'json') {
          newOptions.headers = {
            ...newOptions.headers,
            'Content-Type': 'application/json; charset=UTF-8',
          };
          newOptions.body = JSON.stringify(newOptions.body);
        } else {
          let formData = new FormData();
          Object.keys(newOptions.body).map(item => {
            formData.append(item, newOptions.body[item]);
          });
          newOptions.body = formData;
        }
      }
    } else {
      delete newOptions.body;
    }
    fetch(_url, newOptions)
      .then((response: any) => {
        return response.json();
      })
      .then((data: any) => {
        this.props.loadSuccess && this.props.loadSuccess(data);
        if (Array.isArray(data)) {
          this.setState({ dataList: data });
        } else {
          this.setState({ dataList: data.data });
        }
      });
  };

  render() {
    const {
      editable,
      labelName,
      valueName,
      textStyle,
      className,
      onChange,
      filter,
      ...rest
    } = this.props;
    const key = valueName || 'key';
    const label = labelName || 'label';
    let renderOption: any = [];
    const dataMap: any = [];
    if (this.state.dataList instanceof Array) {
      this.state.dataList.map((option: any) => {
        if (!filter) {
          renderOption.push(
            <Option key={String(option[key])} value={String(option[key])}>
              {option[label]}
            </Option>
          );
        } else {
          if (filter(option)) {
            renderOption.push(
              <Option key={String(option[key])} value={String(option[key])}>
                {option[label]}
              </Option>
            );
          }
        }
      });
      this.state.dataList.forEach((info: any) => {
        dataMap[info[key]] = info[label];
      });
    }
    const text = dataMap[this.props.value];
    return editable || editable == null ? (
      <Select
        className={classnames('view-style')}
        {...rest}
        onChange={value => {
          let all = this.state.dataList.find((item: any) => item[key] === value);
          onChange && onChange(value, all);
        }}
      >
        {renderOption}
      </Select>
    ) : (
      <div className={classnames('view-style')} style={textStyle}>
        {text}
      </div>
    );
  }
}

//@ts-ignore
JSelect._name = 'JSelect';
export default JSelect;
