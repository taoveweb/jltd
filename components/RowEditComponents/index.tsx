import * as React from 'react';
import {
  Form,
  Input,
  Select,
  Icon,
  DatePicker,
  Checkbox,
  Radio,
  InputNumber,
  Cascader,
} from 'antd';
import classnames from 'classnames';
import * as moment from 'moment';
const styles = require('./style/index.less');
import RanderRange from '../LabelWithController/RanderRange';
import DataDictionaryComponents from '../DataDictionaryComponents/DataDictionaryComponents';
import Enum from '../_util/enum';
import city from '../_util/city';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const Search = Input.Search;
const Option = Select.Option;
const RadioGroup = Radio.Group;
// 获取FormItem
const FormItem = Form.Item;

type RowEditComponentsState = {
  dataDictionaryList: undefined[];
  loading: boolean;
};

interface RowEditComponentsProps {
  handleSubmit: (...args: any[]) => any;
  getRefForm: any;
  form: any;
  formItemProps: any;
  initialValue: any;
  field: any;
  maxLength: any;
  clearData: any;
  format: string;
  fieldOption: { initialValue?: any };
  onChange: (min?: any, max?: any, c?: any) => void;
  max: any;
  onSearch: any;
  mode: any;
  DateBegin: any;
  codeType: any;
  dropdownMatchSelectWidth: any;
  rows: any;
  minValue: any;
  radioData: any;
  maxValue: any;
  DateEnd: any;
  parser: any;
  formatter: any;
  className: any;
  step: any;
  readOnly: any;
  optionData: any;
  min: any;
  editable: any;
  viewStyle: any;
  onBlur: any;
  filterOption: any;
  precision: any;
  fileId: any;
  modalShow: any;
  disabled: any;
  defaultValue: any;
  placeholder: any;
  style: any;
  value: any;
  type: any;
  datas?: Array<{
    isRequire?: boolean; // 是否显示必填星号提示
    type: string; // 类型
    onChange: Function; // 状态变化方法
    value?: string; // 外部修改输入框的值
    codeType?: string; // 数据字典选择框的类型
    defaultValue?: string; // 默认值
    className?: string; // 样式修改
    dropdownMatchSelectWidth?: boolean;
    mode?: string;
    style?: Object;
    placeholder?: string; // 提示文字
    optionData?: Array<{ value: string; text: string }>; // 下拉框内容
    radioData?: Array<{ value: string; text: string }>; // 下拉框内容
  }>; // 下拉框内容
}
class RowEditComponents extends React.Component<
  RowEditComponentsProps,
  RowEditComponentsState
> {
  private formItemLayout: object;
  private fieldOption?: { initialValue?: any };

  constructor(props: RowEditComponentsProps) {
    super(props);
    // formItem的布局样式
    this.formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    this.fieldOption = {};
  }
  componentDidMount() {
    if (this.props.getRefForm != null) {
      this.props.getRefForm(this.props.form);
    }
  }
  componentWillReceiveProps(nextPorps: RowEditComponentsProps) {
    if (nextPorps.fieldOption == null) {
      this.fieldOption = { initialValue: nextPorps.value };
    } else if (nextPorps.fieldOption.initialValue == null) {
      this.fieldOption = nextPorps.fieldOption;
      this.fieldOption.initialValue = nextPorps.value;
    }
  }
  /**
   * 创建FormItem
   * formItemProps: FormItem的属性
   * fileId: 控件的id，唯一标识
   * fieldOption: getFieldDecorator方法传入的option
   * field： 组件
   */
  createFormItem = (field: any) => {
    const { getFieldDecorator } = this.props.form;
    const { formItemProps, fileId, editable } = this.props;
    const formItemProp =
      formItemProps == null ? this.formItemLayout : formItemProps;
    //const { fieldOption, type } = this.props;
    /* const options = fieldOption == null ? {} : fieldOption;
        if (!('rules' in options) && type === 'input') {
          options.rules = [{}];
        }
        if ('rules' in options && type === 'input') {
          const lastOptions = options.rules[options.rules.length - 1];
          if (
            !('validator' in lastOptions) ||
            ('validator' in lastOptions && !('label' in lastOptions))
          ) {
            options.rules.push({
              label: '',
              validator: (rule, value, cb) => {
                if (value && value.length > 0 && value.trim().length === 0) {
                  setFieldsValue({ [fileId]: value.trim() });
                  cb('有多余的空隔');
                } else {
                  cb();
                }
              },
            });
          }
        } */
    return (
      <div>
        {editable ? (
          <FormItem {...formItemProp}>
            {getFieldDecorator(fileId == null ? '' : fileId, this.fieldOption)(
              field
            )}
          </FormItem>
        ) : (
          this.noEditTableHandler()
        )}
      </div>
    );
  };
  noEditTableHandler = () => {
    const { value } = this.props;
    let renderController = null;
    if (this.props.type === 'dataDictionary') {
      renderController = this.editComponents(this.props);
    } else if (this.props.type === 'dataPicker') {
      const dateValue =
        value == null ? '' : value.format(this.props.format || 'YYYY/MM/DD');
      renderController = <span>{dateValue}</span>;
    } else {
      renderController = <span>{value == null ? '' : value}</span>;
    }
    return renderController;
  };
  createHiddenInput = (field: any) => {
    const { fileId, editable, value } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {editable ? (
          <FormItem>
            {getFieldDecorator(fileId == null ? '' : fileId, this.fieldOption)(
              field
            )}
          </FormItem>
        ) : (
          <span>{value == null ? '' : value}</span>
        )}
      </div>
    );
  };
  convertFormInfo = () => {
    if (this.props.type === 'hidden') {
      var field =
        this.props.field == null ? <Input type="hidden" /> : this.props.field;
      return this.createHiddenInput(field);
    }
    var field =
      this.props.field == null
        ? this.editComponents(this.props)
        : this.props.field;
    return this.createFormItem(field);
  };
  render() {
    const renderController = this.convertFormInfo();
    return <div>{renderController}</div>;
  }
  regexValid = (value: any, regex: any) => {
    if (!regex.test(value)) {
      value = value.substring(0, value.lastIndexOf(value[value.length - 1]));
      value = this.regexValid(value, regex);
    }
    return value;
  };
  editComponents = (props: RowEditComponentsProps) => {
    let renderController: any;
    // 输入框
    if (this.props.type === 'input') {
      const valueProps: { value?: any } = {};
      if (this.props.value || this.props.value === '') {
        valueProps.value = this.props.value;
      }
      renderController = (
        <Input
          maxLength={this.props.maxLength || 50}
          {...valueProps}
          defaultValue={this.props.defaultValue}
          placeholder={this.props.placeholder || Enum.DEFAULT_PLACEHOLDER}
          className={styles['view-style']}
          disabled={this.props.disabled === true}
          style={this.props.style}
          onBlur={e => {
            if (props.fileId) {
              const value = e.target.value;
              this.props.form.setFieldsValue({ [props.fileId]: value.trim() });
            }
            if (this.props.onBlur) {
              this.props.onBlur(e.target.value);
            }
          }}
          onChange={e => {
            if (this.props.onChange) {
              this.props.onChange(e.target.value);
            }
          }}
        />
      );
    }
    // 输入框
    if (this.props.type === 'inputNumber') {
      const valueProps: { value?: any } = {};
      if (this.props.value || this.props.value === '') {
        valueProps.value = this.props.value;
      }
      renderController = (
        <InputNumber
          max={this.props.max}
          min={this.props.min}
          precision={this.props.precision}
          disabled={this.props.disabled === true}
          onChange={this.props.onChange}
          step={this.props.step || 1}
          formatter={this.props.formatter}
          parser={this.props.parser}
        />
      );
    }
    // 多行输入框
    if (this.props.type === 'textarea') {
      renderController = (
        <TextArea
          onBlur={e => {
            if (props.fileId) {
              const value = e.target.value;
              this.props.form.setFieldsValue({ [props.fileId]: value.trim() });
            }
          }}
          rows={this.props.rows === undefined ? 4 : this.props.rows}
          value={this.props.value}
          placeholder={this.props.placeholder || Enum.DEFAULT_PLACEHOLDER}
          className={classnames(styles['view-style'], this.props.viewStyle)}
          disabled={this.props.disabled === true}
          style={this.props.style}
          maxLength={props.maxLength || 255}
          onChange={e => {
            if (this.props.onChange) {
              this.props.onChange(e.target.value);
            }
          }}
        />
      );
    }
    // 查询框
    if (this.props.type === 'search') {
      renderController = (
        <Search
          defaultValue={this.props.defaultValue}
          placeholder={this.props.placeholder || Enum.DEFAULT_PLACEHOLDER}
          onChange={this.props.onChange}
          className={styles['view-style']}
          enterButton
          onSearch={this.props.onSearch}
          readOnly={this.props.readOnly}
        />
      );
    }
    // 选择框
    // 如果props.filterOption有方法，表示是带输入过滤的选择框模式
    if (this.props.type === 'select') {
      const renderOption = (this.props.optionData || []).map((option: any) => {
        return (
          <Option key={option.value} value={option.value}>
            {option.text}
          </Option>
        );
      });
      // 输入搜索模式
      let showSearch = false;
      const optionFilterProp = 'children';
      if (this.props.filterOption) {
        showSearch = true;
      }
      renderController = (
        <Select
          disabled={
            this.props.disabled === true || this.props.disabled === 'true'
          }
          showSearch={showSearch}
          optionFilterProp={optionFilterProp}
          value={this.props.value}
          defaultValue={this.props.defaultValue}
          onChange={this.props.onChange}
          filterOption={this.props.filterOption}
          style={this.props.style || { width: 170 }}
          className={this.props.className || styles['view-style']}
          placeholder={this.props.placeholder || Enum.DEFAULT_PLACEHOLDER}
          dropdownMatchSelectWidth={
            this.props.dropdownMatchSelectWidth === undefined
              ? true
              : this.props.dropdownMatchSelectWidth
          }
        >
          {renderOption}
        </Select>
      );
    }
    // 日期选择器
    if (this.props.type === 'dataPicker') {
      renderController = (
        <DatePicker
          className={styles['view-style']}
          defaultValue={
            this.props.defaultValue ? this.props.defaultValue : null
          }
          format={this.props.format || 'YYYY/MM/DD'}
          showTime
          onChange={(data, dateStrings) => {
            if (this.props.onChange) {
              this.props.onChange(dateStrings);
            }
          }}
          value={this.props.value ? this.props.value : null}
        />
      );
    }
    if (this.props.type === 'rangePicker') {
      renderController = (
        <RangePicker
          value={
            this.props.DateBegin
              ? [moment(this.props.DateBegin), moment(this.props.DateEnd)]
              : []
          }
          onChange={(moments, dateStrings) => {
            if (this.props.onChange) {
              this.props.onChange(dateStrings[0], dateStrings[1], moments);
            }
          }}
        />
      );
    }
    // 勾选框
    if (this.props.type === 'checkbox') {
      renderController = (
        <Checkbox
          defaultChecked={this.props.defaultValue}
          onChange={this.props.onChange}
        />
      );
    }
    // 范围输入框
    if (this.props.type === 'range') {
      const { onChange, minValue, maxValue } = this.props;
      renderController = (
        <RanderRange
          onChange={onChange}
          minValue={minValue}
          maxValue={maxValue}
        />
      );
    }
    // br换行
    if (this.props.type === 'br') {
      return <br />;
    }
    // 单选按钮
    if (this.props.type === 'radioGroup') {
      const renderRadio = (props.radioData || []).map((data: any) => {
        return <Radio value={data.value}>{data.text}</Radio>;
      });
      renderController = (
        <RadioGroup
          onChange={e => {
            props.onChange == null ? '' : props.onChange(e.target.value);
          }}
        >
          {renderRadio}
        </RadioGroup>
      );
    }
    if (this.props.type === 'dataDictionary') {
      renderController = (
        <DataDictionaryComponents
          allowClear
          codeType={this.props.codeType}
          editable={this.props.editable != null}
          disabled={
            this.props.disabled === true || this.props.disabled === 'true'
          }
          value={this.props.value}
          defaultValue={this.props.defaultValue}
          className={this.props.className || styles['view-style']}
          style={this.props.style || { width: 170 }}
          onChange={this.props.onChange}
          placeholder={this.props.placeholder || Enum.DEFAULT_PLACEHOLDER}
          dropdownMatchSelectWidth={
            this.props.dropdownMatchSelectWidth === undefined
              ? true
              : this.props.dropdownMatchSelectWidth
          }
          mode={this.props.mode ? this.props.mode : ''}
        />
      );
    }
    if (this.props.type === 'cascader') {
      renderController = (
        <Cascader
          style={this.props.style || { width: '100%' }}
          options={city}
          placeholder={this.props.placeholder || Enum.DEFAULT_PLACEHOLDER}
          onChange={this.props.onChange}
          disabled={
            this.props.disabled === true || this.props.disabled === 'true'
          }
        />
      );
    }
    if (this.props.type == 'popWin') {
      const valueProps: { x2?: any } = {};
      if (this.props.value || this.props.value === '') {
        valueProps.x2 = this.props.value;
      }
      renderController = (
        <Input
          {...valueProps}
          defaultValue={this.props.defaultValue}
          placeholder={this.props.placeholder || Enum.DEFAULT_PLACEHOLDER}
          className={styles['view-style']}
          readOnly
          disabled={this.props.disabled}
          style={this.props.style}
          suffix={
            this.props.value ? (
              <div>
                <Icon type="close" onClick={this.props.clearData} />
                <Icon type="search" onClick={this.props.modalShow} />
              </div>
            ) : (
              <Icon type="search" onClick={this.props.modalShow} />
            )
          }
        />
      );
    }
    return renderController;
  };
}
export default RowEditComponents;
