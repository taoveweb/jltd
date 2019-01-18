import * as React from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  Checkbox,
  Radio,
  Cascader,
  InputNumber,
  Icon,
} from 'antd';
// const styles = require('./style/index.less');
import classnames from 'classnames';
import * as moment from 'moment';
import RanderRange from '../label-with-controller/RanderRange';
import DataDictionaryComponents from '../DataDictionaryComponents';
import RadioGroupComponents from '../radio-group-components';
import Enum from '../_util/enum';
import city from '../_util/city';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const Search = Input.Search;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

//获取FormItem
const FormItem = Form.Item;

export interface FormComponentsProps {
  getRefForm: any;
  form: any;
  placeholder: any;
  value: any;
  handleSubmit: (e?: any) => void; // 提交方法
  datas?: Array<{
    isRequire?: boolean; // 是否显示必填星号提示
    type: string; // 类型
    onChange: Function; // 状态变化方法
    value?: any; // 外部修改输入框的值
    codeType?: string; // 数据字典选择框的类型
    defaultValue?: string; // 默认值
    className?: string; // 样式修改
    dropdownMatchSelectWidth?: boolean;
    mode?: string;
    style?: Object;
    col?: any;

    placeholder?: string; // 提示文字
    optionData?: Array<{ value: string; text: string }>; // 下拉框内容
    radioData?: Array<{ value: string; text: string }>; // 下拉框内容
  }>; // 下拉框内容
}
export interface FormComponentsState {
  dataDictionaryList: Array<any>;
  loading: boolean;
}

class FormComponents extends React.Component<
  FormComponentsProps,
  FormComponentsState
> {
  private formItemLayout: object;
  constructor(props: FormComponentsProps) {
    super(props);
    this.state = {
      dataDictionaryList: [],
      loading: false,
    };

    //formItem的布局样式
    this.formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
  }

  componentDidMount() {
    if (this.props.getRefForm != null) {
      this.props.getRefForm(this.props.form);
    }
  }

  /**
   * 创建FormItem
   * formItemProps: FormItem的属性
   * fileId: 控件的id，唯一标识
   * fieldOption: getFieldDecorator方法传入的option
   * field： 组件
   */
  createFormItem = (
    { formItemProps, label, fileId, fieldOption }: any,
    field: any
  ) => {
    const { getFieldDecorator } = this.props.form;
    const formItemProp =
      formItemProps == null ? this.formItemLayout : formItemProps;
    let options = fieldOption == null ? {} : fieldOption;
    /* if (!("rules" in options) && type === "input") {
      options.rules = [{}];
    }
    if ("rules" in options && type === "input") {
      const lastOptions = options.rules[options.rules.length - 1];
      if (
        !("validator" in lastOptions) ||
        ("validator" in lastOptions && !("label" in lastOptions))
      )
        options.rules.push({
          label: "",
          validator: (rule, value, cb) => {
            if (value && value.length > 0 && value.trim().length === 0 ) {
              //setFieldsValue({[fileId]:value.trim()});
              cb("有多余的空隔");
            } else {
              cb();
            }
          }
        });
    } */
    return (
      <FormItem {...formItemProp} label={label} colon={false}>
        {getFieldDecorator(fileId == null ? '' : fileId, options)(field)}
      </FormItem>
    );
  };

  createHiddenInput = ({ fileId, fieldOption }: any, field: any) => {
    return (
      <div>
        {this.props.form.getFieldDecorator(
          fileId == null ? '' : fileId,
          fieldOption == null ? {} : fieldOption
        )(field)}
      </div>
    );
  };

  createDetail = ({ formItemProps, label, val, customFontSize }: any) => {
    const formItemProp =
      formItemProps == null ? this.formItemLayout : formItemProps;
    return (
      <FormItem {...formItemProp} label={label}>
        <span
          style={{ fontSize: null == customFontSize ? 14 : customFontSize }}
        >
          {val == null ? '' : val}
        </span>
      </FormItem>
    );
  };

  convertFormInfo = (data: any) => {
    if (data.type === 'hidden') {
      var field = data.field == null ? <Input type="hidden" /> : data.field;
      return this.createHiddenInput(data, field);
    } else if (data.type === 'detail') {
      return this.createDetail(data);
    } else {
      var field = data.field == null ? this.editComponents(data) : data.field;
      return this.createFormItem(data, field);
    }
  };

  render() {
    let renderController = [];

    if (this.props.datas != null && this.props.datas.length > 0) {
      var hiddenCount = 0;
      var tempRender = [];
      for (var i = 0; i < this.props.datas.length; i++) {
        var data = this.props.datas[i];
        if (data.col == 0) {
          if (
            (i - hiddenCount) % 3 == 2 ||
            (i == this.props.datas.length - 1 && tempRender.length != 0)
          ) {
            renderController.push(<Row>{tempRender}</Row>);
            tempRender = [];
          }
          continue;
        }

        var formInfo = this.convertFormInfo(data);
        if (data.type === 'hidden') {
          renderController.push(formInfo);
          hiddenCount++;
          continue;
        }
        tempRender.push(<Col span={data.col || 8}>{formInfo}</Col>);
        if (
          (i - hiddenCount) % 3 == 2 ||
          (i == this.props.datas.length - 1 && tempRender.length != 0)
        ) {
          renderController.push(<Row>{tempRender}</Row>);
          tempRender = [];
        }
      }
    }

    return <Form onSubmit={this.props.handleSubmit} className={'ant-form-components'}>{renderController}</Form>;
  }

  regexValid = (value: any, regex: any) => {
    if (!regex.test(value)) {
      value = value.substring(0, value.lastIndexOf(value[value.length - 1]));
      value = this.regexValid(value, regex);
    }
    return value;
  };
  onBlur(props:any) {
    if (props.value == '') {
      this.props.form.setFields({ [props.fileId]: props.fieldOption });
    }
  }
  editComponents = (props: any) => {
    let renderController = null;
    // 输入框
    if (props.type === 'input') {
      const valueProps: any = {};
      if (props.value || props.value === '') {
        valueProps.value = props.value;
      }
      renderController = (
        <Input
          maxLength={props.maxLength || 50}
          autoComplete={'off'}
          {...valueProps}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder || Enum.DEFAULT_PLACEHOLDER}
          className={props.className || 'view-style'}
          disabled={props.disabled === true}
          style={props.style}
          onBlur={this.onBlur.bind(this,this.props)}
          onChange={(e: any) => {
            if (props.onChange) {
              props.onChange(e.target.value);
            }
          }}
          onClick={(e: any) => {
            if (props.onClick) {
              props.onClick(e.target.value);
            }
          }}
          suffix={props.suffix}
        />
      );
    }

    if (props.type == 'popWin') {
      const valueProps: any = {};
      if (props.value || props.value === '') {
        valueProps.value = props.value;
      }
      renderController = (
        <Input
          {...valueProps}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder || Enum.DEFAULT_PLACEHOLDER}
          className={props.className || 'view-style'}
          readOnly={true}
          disabled={props.disabled}
          style={props.style}
          suffix={
            props.suffix ? (
              <div>
                <Icon type="close" onClick={props.clearData} />{' '}
                <Icon type="search" onClick={props.modalShow} />
              </div>
            ) : (
              <Icon type="search" onClick={props.modalShow} />
            )
          }
        />
      );
    }

    // 输入框
    if (props.type === 'inputNumber') {
      const valueProps: any = {};
      if (props.value || props.value === '') {
        valueProps.value = props.value;
      }
      renderController = (
        // <Input
        // 	maxLength={props.maxLength || 50}
        // 	{...valueProps}
        // 	defaultValue={props.defaultValue}
        // 	placeholder={props.placeholder || Enum.DEFAULT_PLACEHOLDER}
        // 	className={styles['view-style']}
        // 	disabled={props.disabled === true}
        // 	style={props.style}
        // 	onBlur={e => {
        // 		var value = e.target.value;
        // 		e.target.value = this.regexValid(value, props.regex || /^\d*\.?\d{0,3}$/);
        // 	}}
        // 	onChange={e => {
        // 		var value = e.target.value;
        // 		e.target.value = this.regexValid(value, props.regex || /^\d*\.?\d{0,3}$/);
        // 	}}
        // />}
        <InputNumber
          max={props.max}
          min={props.min}
          precision={props.precision}
          disabled={props.disabled === true}
          onChange={props.onChange}
          step={props.step || 1}
          formatter={props.formatter}
          parser={props.parser}
          placeholder={props.placeholder || Enum.DEFAULT_PLACEHOLDER}
        />
      );
    }

    // 多选框
    if (props.type === 'checkboxGroup') {
      const valueProps: any = {};
      if (props.value || props.value === '') {
        valueProps.value = props.value;
      }
      renderController = <CheckboxGroup options={props.options} />;
    }

    // 多行输入框
    if (props.type === 'textarea') {
      renderController = (
        <TextArea
          onBlur={e => {
            if (props.fileId) {
              let value = e.target.value;
              this.props.form.setFieldsValue({ [props.fileId]: value.trim() });
            }
          }}
          rows={props.rows === undefined ? 4 : props.rows}
          value={props.value}
          placeholder={props.placeholder || Enum.DEFAULT_PLACEHOLDER}
          className={classnames('view-style', props.viewStyle)}
          disabled={props.disabled === true}
          style={props.style}
          maxLength={props.maxLength || 255}
          onChange={e => {
            if (props.onChange) {
              props.onChange(e.target.value);
            }
          }}
        />
      );
    }

    // 查询框
    if (props.type === 'search') {
      renderController = (
        <Search
          defaultValue={props.defaultValue}
          placeholder={props.placeholder || Enum.DEFAULT_PLACEHOLDER}
          onSearch={props.onSearch}
          className={props.className || 'view-style'}
          enterButton
          onClick={props.onClick}
          readOnly={props.readOnly}
          disabled={props.disabled}
        />
      );
    }

    // 选择框
    // 如果props.filterOption有方法，表示是带输入过滤的选择框模式
    if (props.type === 'select') {
      const renderOption = (props.optionData || []).map((option: any) => {
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
          disabled={props.disabled === true || props.disabled === 'true'}
          showSearch={showSearch}
          optionFilterProp={optionFilterProp}
          value={props.value}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          filterOption={props.filterOption}
          style={props.style}
          className={props.className || 'view-style'}
          placeholder={this.props.placeholder || Enum.DEFAULT_PLACEHOLDER}
          dropdownMatchSelectWidth={
            props.dropdownMatchSelectWidth === undefined
              ? true
              : props.dropdownMatchSelectWidth
          }
        >
          {renderOption}
        </Select>
      );
    }

    // 日期选择器
    if (props.type === 'dataPicker') {
      renderController = (
        <DatePicker
          className={props.className || 'view-style'}
          defaultValue={props.defaultValue}
          format={props.format || 'YYYY/MM/DD'}
          showTime
          onChange={(moments, dateStrings) => {
            if (props.onChange) {
              props.onChange(dateStrings, moments);
            }
          }}
          value={props.value || ''}
        />
      );
    }
    if (props.type === "dataFormatPicker") {
      renderController = (
        <DatePicker
          className={props.className || 'view-style'}
          defaultValue={props.defaultValue}
          format={props.format || "YYYY/MM/DD"}
          onChange={(dateStrings) => {
            if (props.onChange) {
              props.onChange(dateStrings);
            }
          }}
          value={props.value || ''}
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
          onChange={(moments, dateStrings) => {
            if (props.onChange) {
              props.onChange(dateStrings[0], dateStrings[1], moments);
            }
          }}
        />
      );
    }

    // 勾选框
    if (props.type === 'checkbox') {
      renderController = (
        <Checkbox
          defaultChecked={props.defaultValue}
          onChange={props.onChange}
        />
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

    // br换行
    if (props.type === 'br') {
      return <br />;
    }

    // 单选按钮
    if (props.type === 'radioGroup') {
      renderController = (
        <RadioGroupComponents
          codeType={props.codeType}
          onChange={props.onChange}
          disabled={props.disabled === true || props.disabled === 'true'}
          value={props.value}
          defaultValue={props.defaultValue}
        />
      );
    }

    // 单选按钮
    if (props.type === 'radioGroupOld') {
      const renderRadio = (props.radioData || []).map((data: any) => {
        return <Radio value={data.value}>{data.text}</Radio>;
      });

      renderController = (
        <RadioGroup
          onChange={e => {
            props.onChange == null ? '' : props.onChange(e.target.value);
          }}
          disabled={props.disabled}
          value={props.value}
          defaultValue={props.defaultValue}
        >
          {renderRadio}
        </RadioGroup>
      );
    }

    if (props.type === 'dataDictionary') {
      renderController = (
        <DataDictionaryComponents
          codeType={props.codeType}
          editable={true}
          allowClear={props.allowClear}
          placeholder={
            this.props.placeholder || Enum.DEFAULT_SELECT_PLACEHOLDER
          }
          disabled={props.disabled === true || props.disabled === 'true'}
          value={props.value}
          defaultValue={props.defaultValue}
          className={props.className || 'view-style'}
          style={props.style}
          onChange={props.onChange}
          dropdownMatchSelectWidth={
            props.dropdownMatchSelectWidth === undefined
              ? true
              : props.dropdownMatchSelectWidth
          }
          mode={props.mode ? props.mode : ''}
        />
      );
    }

    if (props.type === 'cascader') {
      renderController = (
        <Cascader
          style={props.style || { width: '100%' }}
          options={city}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      );
    }

    if (props.type === 'a') {
      renderController = (
        <a
          type={props.type}
          // disabled={props.disabled}
          style={props.style || { 'margin-left': '30px' }}
          onClick={props.onClick}
          onChange={props.onChange}
        >
          {props.text}
        </a>
      );
    }

    return renderController;
  };
}

export default Form.create({})(FormComponents);
