import * as React from 'react';
import url from '../_util/url';
import * as $ from 'jquery';

import { Select } from 'antd';
const styles = require('./style/index');

const Option = Select.Option;
type SelectComponentsState = {
  dataDictionaryList: undefined[];
  value: null;
};

interface SelectComponentsprops {
  allowClear: any;
  defaultValue: any;
  autoFocus: any;
  defaultActiveFirstOption: any;
  disabled: any;
  dropdownClassName: any;
  dropdownMatchSelectWidth: any;
  firstActiveValue: any;
  labelInValue: any;
  mode: any;
  notFoundContent: any;
  placeholder: any;
  showArrow: any;
  showSearch: any;
  size: any;
  tokenSeparators: any;
  style: any;
  codeType: any;
  url: any;
  onSelectChange: any;
  onBlur: any;
  onDeselect: any;
  onFocus: any;
  onMouseEnter: any;
  onMouseLeave: any;
  onPopupScroll: any;
  onSearch: any;
  onSelect: any;
}

class SelectComponents extends React.Component<
  SelectComponentsprops,
  SelectComponentsState
> {
  constructor(props: SelectComponentsprops) {
    super(props);
    this.state = {
      dataDictionaryList: [],
      value: null,
    };
  }

  componentWillMount() {
    this.selectData();
  }

  onSelectChange = (value: any) => {
    if (value == null) {
      value = '';
    }
    this.setState({
      value,
    });

    if (this.props.onSelectChange === undefined) {
      return;
    }

    this.props.onSelectChange(value);
  };

  selectData = () => {
    const { codeType } = this.props;

    var self = this;
    $.ajax({
      url: url.system.getSelectData(),
      data: { codeType: codeType },
      cache: false,
      async: false,
      type: 'POST',
      dataType: 'json',
      success: function(data: any) {
        if (data.data) {
          self.setState({
            dataDictionaryList: data.data,
          });
        }
      },
    });
  };

  render() {
    const style =
      this.props.style === undefined ? { width: 170 } : this.props.style;
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

    return (
      <div>
        <Select
          {...this.props}
          className={styles['view-style']}
          style={style}
          onChange={this.onSelectChange}
        >
          {renderOption}
        </Select>
      </div>
    );
  }
}

export default SelectComponents;
