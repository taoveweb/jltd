import * as React from 'react';
import { Form, Input, Select, DatePicker, Checkbox, Radio } from 'antd';
import classnames from 'classnames';
import * as moment from 'moment';


// import DataDictionaryComponents from '../../DataDictionaryComponents';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const Search = Input.Search;
const Option = Select.Option;
const RadioGroup = Radio.Group;
// 获取FormItem
const FormItem = Form.Item;
export interface EditableCellProps {
  getEditRowFormRef?: any;
  rows?: any;
  placeholder?: any;
  className?: any;
  DateEnd?: any;
  DateBegin?: any;
  viewStyle?: any;
  filterOption?: any;
  radioData?: any;
  optionData?: any;
  fieldId?: any;
  defaultValue?: any;
  style?: any;
  dropdownMatchSelectWidth?: any;
  disabled?: boolean | string;
  onBlur?: (e?: any) => void;
  onChange: (e?: any, b?: any, c?: any) => void | any;
  onClick?: (e?: any) => void;
  maxLength?: number;
  type?: string;
  editable?: any;
  value: string;
  field?: string;
  fieldOption?: any;
  form?: any;
}

class EditableCell extends React.Component<EditableCellProps> {
  private fieldOption: any;

  constructor(props: EditableCellProps) {
    super(props);
    this.state = {
      dataDictionaryList: [],
      loading: false,
    };
    this.fieldOption = {};
  }

  componentDidMount() {
    if (this.props.getEditRowFormRef != null) {
      this.props.getEditRowFormRef(this.props.form);
    }
  }

  componentWillReceiveProps(nextPorps: EditableCellProps) {
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
   * fieldId: 控件的id，唯一标识
   * fieldOption: getFieldDecorator方法传入的option
   * field： 组件
   */
  createFormItem = (field: any) => {
    const { fieldId, editable, value, form } = this.props;
    const { getFieldDecorator } = form;
    const options = this.fieldOption;
    if (!options.initialValue) {
      options.initialValue = value;
    }
    return (
      <div>
        {editable ? (
          <FormItem>{getFieldDecorator(fieldId == null ? '' : fieldId, options)(field)}</FormItem>
        ) : (
          <span>{value == null ? '' : value}</span>
        )}
      </div>
    );
  };

  createHiddenInput = (field: any) => {
    const { fieldId, editable, value, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        {editable ? (
          <FormItem>
            {getFieldDecorator(fieldId == null ? '' : fieldId, this.fieldOption)(field)}
          </FormItem>
        ) : (
          <span>{value == null ? '' : value}</span>
        )}
      </div>
    );
  };

  convertFormInfo = () => {
    let field;
    if (this.props.type === 'hidden') {
      field = this.props.field == null ? <Input type="hidden" /> : this.props.field;
      return this.createHiddenInput(field);
    }
    field = this.props.field == null ? this.editComponents() : this.props.field;
    return this.createFormItem(field);
  };

  editComponents = () => {
    switch (this.props.type) {
      case 'input':
        return (
          <Input
            maxLength={this.props.maxLength}
            placeholder={this.props.placeholder}
            className={'editable-cell-view-style'}
            disabled={this.props.disabled === true}
            style={this.props.style}
            onBlur={e => {
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
      case 'textarea':
        return (
          <TextArea
            rows={this.props.rows === undefined ? 4 : this.props.rows}
            value={this.props.value}
            placeholder={this.props.placeholder}
            className={classnames('editable-cell-view-style', this.props.viewStyle)}
            disabled={this.props.disabled === true}
            style={this.props.style}
            onChange={e => {
              if (this.props.onChange) {
                this.props.onChange(e.target.value);
              }
            }}
          />
        );
      case 'search':
        return (
          <Search
            defaultValue={this.props.defaultValue}
            placeholder={this.props.placeholder}
            onSearch={this.props.onChange}
            className={'editable-cell-view-style'}
            onClick={this.props.onClick}
          />
        );
      case 'select':
        const {
          className,
          disabled,
          dropdownMatchSelectWidth,
          filterOption,
          onChange,
          optionData,
          placeholder,
          style,
        } = this.props;
        const renderOption = (optionData || []).map((option?: any) => {
          return (
            <Option key={option.value} value={option.value}>
              {option.text}
            </Option>
          );
        });
        // 输入搜索模式
        let showSearch = false;
        // 如果props.filterOption有方法，表示是带输入过滤的选择框模式
        if (filterOption) {
          showSearch = true;
        }
        return (
          <Select
            disabled={disabled === true || disabled === 'true'}
            showSearch={showSearch}
            optionFilterProp="children"
            onChange={onChange}
            filterOption={filterOption}
            style={style || { width: 170 }}
            className={className || 'editable-cell-view-style'}
            dropdownMatchSelectWidth={
              dropdownMatchSelectWidth === undefined ? true : dropdownMatchSelectWidth
            }
            placeholder={placeholder}
          >
            {renderOption}
          </Select>
        );
      case 'dataPicker':
        return (
          <DatePicker
            className={'editable-cell-view-style'}
            defaultValue={this.props.defaultValue}
            format="YYYY/MM/DD"
            onChange={(moments, dateStrings) => {
              if (this.props.onChange) {
                this.props.onChange(dateStrings, moments);
              }
            }}
            value={moment(this.props.value)}
          />
        );
      case 'rangePicker':
        return (
          <RangePicker
            value={
              this.props.DateBegin ? [moment(this.props.DateBegin), moment(this.props.DateEnd)] : []
            }
            onChange={(moments, dateStrings) => {
              if (this.props.onChange) {
                this.props.onChange(dateStrings[0], dateStrings[1], moments);
              }
            }}
          />
        );
      case 'checkbox':
        return (
          <div className={classnames('editable-cell-view-style', 'editable-cell-checkbox-style')}>
            <Checkbox defaultChecked={this.props.defaultValue} onChange={this.props.onChange} />
          </div>
        );
      case 'radioGroup':
        const renderRadio = (this.props.radioData || []).map((radio: any) => {
          return (
            <Radio value={radio.value} key={radio.value}>
              {radio.text}
            </Radio>
          );
        });
        return (
          <div className={classnames('editable-cell-view-style', 'editable-cell-radio-group-style')}>
            <RadioGroup
              onChange={e => {
                this.props.onChange(e.target.value);
              }}
              value={this.props.value}
            >
              {renderRadio}
            </RadioGroup>
          </div>
        );
      default:
        break;
    }
  };

  render() {
    return <div>{this.convertFormInfo()}</div>;
  }
}
export default EditableCell;
