import * as React from 'react';
import {
  Select,
  Input,
  DatePicker,
  Checkbox,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Cascader,
} from 'antd';
import classnames from 'classnames';
// import * as moment from 'moment';
import RanderRange from './RanderRange';
// const styles = require('./style/index.less');
import DataDictionaryComponents from '../DataDictionaryComponents';
import Enum from '../_util/enum';
const moment =require("moment");
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

const Search = Input.Search;
const Option = Select.Option;

export interface LabelWithControllerProps {
  isRequire?: boolean; // 是否显示必填星号提示
  type: string; // 类型
  label: string; // 文字说明
  onChange: (e?: any, c?: any, d?: any) => void; // 状态变化方法
  value?: string; // 外部修改输入框的值
  isIconRequire?: boolean; // 是否显示感叹号提示语
  className?: string; // 定义外层的class
  placeholder?: any; // 提示文字
  optionData?: Array<{ value: string; text: string }>; // 下拉框内容
  radioData?: Array<{ value: string; text: string }>; // 单选框内容
  monetary?: string; // 各种单位
  viewStyle?: string; // 输入控件的自定义样式
  disabled?: boolean; // 是否禁用
  title?: string;
  min?: number;
  max?: number;
  step?: number;
  formatter?: any;
  parser?: any;
  precision?: any;
  defaultValue?: any;
  maxLength?: any;
  onClick?: (e?: any) => void;
  readOnly?: any;
  onBlur?: (e?: any) => void;
  rows?: any;
  onSearch?: (e?: any) => void;
  suffix?: any;
  filterOption?: any;
  dropdownMatchSelectWidth?: any;
  mode?: any;
  format?: any;
  showTime?: any;
  DateBegin?: any;
  DateEnd?: any;
  options?: any;
  codeType?: any;
  labelClass?: any;
  span?: any;
  style?: any;
  minValue?: any;
  maxValue?: any;
}

/* eslint-disable */
// 输入框: input { label: '设备编号', type: 'input', onChange: this.onEquipmentIdChange， placeholder: '请输入设备编号' },
// 多行输入框: textarea { label: '设备编号', type: 'textarea', rows: 2, viewStyle: styles['textarea-style'], onChange: this.onEquipmentIdChange， placeholder: '请输入设备编号' },
// 查询框: search { label: '设备编号', type: 'input', onChange: this.onEquipmentIdChange， placeholder: '请输入设备编号' },
// 输入框: select { label: '状态', type: 'select', onChange: this.onStatusChange, optionData: [{value: 'no1', text: '第一'}, {value: 'no2', text: '第二'}], filterOption: {(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} },
// 日期选择器: dataPicker { label: '有效日期从', type: 'dataPicker', onChange: this.onDateBeginChange },
// 勾选框: checkbox { label: '是否启用', type: 'checkbox', onChange: this.onDateBeginChange, defalutValue: true},

// 换行 br { type: 'br' }
/* eslint-enable */

const LabelWithController = (props: LabelWithControllerProps) => {
  // 必填的星号提示
  const renderRequire = props.isRequire ? (
    <span className={'label-require'}>*</span>
  ) : null;

  // 感叹号提示语
  const renderIconRequire = props.isIconRequire ? (
    <Tooltip title={props.title}>
      <Icon type="exclamation-circle" />
    </Tooltip>
  ) : null;

  let renderController = null;
  // 单选框
  if (props.type === 'radioGroup') {
    const renderRadio = (props.radioData || []).map(radio => {
      return (
        <Radio value={radio.value} key={radio.value}>
          {radio.text}
        </Radio>
      );
    });

    renderController = (
      <div
        className={classnames(
          'view-style',
          'radio-group-style',
          props.viewStyle
        )}
      >
        <RadioGroup onChange={props.onChange} value={props.value}>
          {renderRadio}
        </RadioGroup>
      </div>
    );
  }

  // 数字输入框
  if (props.type === 'inputnumber') {
    const valueProps: any = {};
    if (props.value || props.value === '') {
      valueProps.value = props.value;
    }
    renderController = (
      <InputNumber
        value={props.value}
        {...valueProps}
        className={classnames('view-style', props.viewStyle)}
        min={props.min ? props.min : 0}
        max={props.max ? props.max : Enum.DB_LENGTH_LIMIT.TWENTY_THREE.VALUE}
        step={props.step ? props.step : 1}
        formatter={props.formatter}
        parser={props.parser}
        precision={props.precision}
        disabled={props.disabled === true}
        onChange={e => {
          props.onChange && props.onChange(e);
        }}
      />
    );
  }

  // 输入框
  if (props.type === 'input') {
    const valueProps: any = {};
    if (props.value || props.value === '') {
      valueProps.value = props.value;
    }
    renderController = (
      <Input
        maxLength={props.maxLength || '50'}
        {...valueProps}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        className={classnames('view-style', props.viewStyle)}
        disabled={props.disabled === true}
        onChange={e => {
          props.onChange && props.onChange(e.target.value.trim());
        }}
        onBlur={(e: any) => {
          props.onBlur && props.onBlur(e.target.value);
        }}
        onClick={props.onClick}
        readOnly={props.readOnly}
      />
    );
  }

  // 多行输入框
  if (props.type === 'textarea') {
    const valueProps: any = {};
    if (props.value || props.value === '') {
      valueProps.value = props.value;
    }
    renderController = (
      <TextArea
        maxLength={props.maxLength || 255}
        {...valueProps}
        rows={props.rows === undefined ? 4 : props.rows}
        value={props.value}
        placeholder={props.placeholder}
        className={classnames('view-style', props.viewStyle)}
        disabled={props.disabled === true}
        onChange={e => {
          props.onChange && props.onChange(e.target.value.trim());
        }}
      />
    );
  }

  // 查询框
  if (props.type === 'search') {
    const valueProps: any = {};
    if (props.value || props.value === '') {
      valueProps.value = props.value;
    }
    renderController = (
      <Search
        maxLength={props.maxLength || '50'}
        value={props.value}
        {...valueProps}
        placeholder={props.placeholder}
        onSearch={props.onSearch}
        disabled={props.disabled || false}
        className={classnames('view-style', props.viewStyle)}
        suffix={props.suffix || null}
        readOnly={props.readOnly}
        onChange={e => {
          props.onChange && props.onChange(e.target.value.trim());
        }}
        onBlur={e => {
          props.onBlur && props.onBlur(e.target.value);
        }}
      />
    );
  }

  // 选择框
  // 如果props.filterOption有方法，表示是带输入过滤的选择框模式
  if (props.type === 'select') {
    const renderOption = (props.optionData || []).map(option => {
      return (
        <Option key={option.value} value={option.value}>
          {option.text}
        </Option>
      );
    });

    // 输入搜索模式
    let showSearch = false;
    const optionFilterProp = 'children';
    if (props.filterOption) {
      showSearch = true;
    }

    renderController = (
      <Select
        allowClear
        disabled={props.disabled === true || false}
        showSearch={showSearch}
        optionFilterProp={optionFilterProp}
        value={props.value || undefined}
        defaultValue={props.defaultValue}
        className={classnames('view-style', props.viewStyle)}
        onChange={props.onChange}
        filterOption={props.filterOption}
        getPopupContainer={() =>
          document.querySelector('.ant-layout-content') as HTMLElement
        }
        dropdownMatchSelectWidth={
          props.dropdownMatchSelectWidth === undefined
            ? true
            : props.dropdownMatchSelectWidth
        }
        placeholder={props.placeholder}
        mode={props.mode}
      >
        {renderOption}
      </Select>
    );
  }

  // 日期选择器
  if (props.type === 'dataPicker') {
    renderController = (
      <DatePicker
        className={classnames('view-style', props.viewStyle)}
        defaultValue={props.defaultValue}
        format={props.format ? props.format : 'YYYY-MM-DD HH:mm:ss'}
        showTime={props.showTime != true}
        value={props.value ? moment(props.value) : moment()}
        onChange={(moments, dateStrings) => {
          props.onChange && props.onChange(dateStrings, moments);
        }}
        disabled={props.disabled}
        placeholder={
          props.placeholder != undefined && props.placeholder != null
            ? props.placeholder
            : '请选择'
        }
      />
    );
  }

  if (props.type === 'rangePicker') {
    renderController = (
      <RangePicker
        value={
          props.DateBegin
            ? [moment(props.DateBegin), moment(props.DateEnd)]
            : []
        }
        className={classnames('view-style', props.viewStyle)}
        onChange={(moments, dateStrings) => {
          props.onChange &&
            props.onChange(dateStrings[0], dateStrings[1], moments);
        }}
        format={props.format ? props.format : 'YYYY-MM-DD HH:mm:ss'}
        showTime={props.showTime != true}
        placeholder={props.placeholder}
      />
    );
  }
  /*
    lastModify：2018.6.20 by matt.huang
    content: 地区选择早期开发没有对第三级没有数据进行判断会报错所以进行添加假数据
     */
  if (props.type === 'cascader') {
    const ret = props.options.find((val: any) => {
      return val.label === '北京';
    });
    renderController = (
      <Cascader
        allowClear
        options={props.options}
        className={classnames('view-style', props.viewStyle)}
        onChange={(value, options) => {
          const newopations: any = options;
          if (newopations.length < 2) {
            return;
          }

          if (ret && newopations.length === 2) {
            newopations.push({
              id: '',
              pid: '',
              name: '',
              value: '',
              label: '',
            });
          }
          props.onChange(value, newopations);
        }}
        changeOnSelect
        disabled={props.disabled === true}
        placeholder="请选择"
        value={props.defaultValue ? props.defaultValue : props.value}
      />
    );
  }

  // 勾选框
  if (props.type === 'checkbox') {
    renderController = (
      <div
        className={classnames(
          'view-style',
          'checkbox-style',
          props.viewStyle
        )}
      >
        <Checkbox
          defaultChecked={props.defaultValue}
          className={'view-style'}
          onChange={props.onChange}
        />
      </div>
    );
  }

  // 范围输入框
  if (props.type === 'range') {
    const { onChange, minValue, maxValue } = props;
    renderController = (
      <RanderRange
        onChange={onChange}
        minValue={minValue}
        maxValue={maxValue}
      />
    );
  }

  // 自定义字典
  if (props.type === 'dataDictionary') {
    renderController = (
      <DataDictionaryComponents
        codeType={props.codeType}
        disabled={props.disabled || false}
        value={props.value}
        defaultValue={props.defaultValue}
        className={props.className || 'view-style'}
        onChange={props.onChange}
        dropdownMatchSelectWidth={
          props.dropdownMatchSelectWidth === undefined
            ? true
            : props.dropdownMatchSelectWidth
        }
        mode={props.mode ? props.mode : ''}
        style={props.style}
      />
    );
  }

  // br换行
  if (props.type === 'br') {
    return <br />;
  }
  //const span = props.span;
  if (props.type === 'div') {
    return <div className={'ant-label-controller-style'} />;
  }
  return (
    <div className={props.className || 'ant-label-controller-style'}>
      <div className={props.labelClass || 'label-text'}>
        {renderRequire}
        {renderIconRequire}
        {props.label}
      </div>
      {renderController}
      {props.monetary}
    </div>
  );
};

export default LabelWithController;
export { RanderRange };
