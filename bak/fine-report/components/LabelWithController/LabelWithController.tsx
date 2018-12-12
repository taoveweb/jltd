import { Cascader, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, Upload } from 'antd';
import classnames from 'classnames';
import * as React from 'react';

require('./LabelWithController.less');
import RanderRange from './RanderRange';

const  moment = require('moment');
const { RangePicker, MonthPicker } = DatePicker;
const { TextArea } = Input;

const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;

type Props = {
  required?: boolean, // 是否显示必填星号提示
  type: string, // 类型
  label: string, // 文字说明
  onChange: Function, // 状态变化方法
  value?: string, // 外部修改输入框的值
  extra?: string, // 右侧显示

  placeholder?: string, // 提示文字
  optionData?: Array<{ value: string, text: string }>, // 下拉框内容

  id: string, // form表单绑定id
  form: { getFieldDecorator: Function }, // 绑定form表单
};



const normFile = (e:any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};


const rangePickerNormalize = (value:any) => {
  let newValue = value;
  if (Array.isArray(value) && value.length === 2) {
    newValue = [moment(value[0]), moment(value[1])];
  }

  return newValue;
};

const renderView = (props: Props) => {
  const propsTemp:any = { ...props };
  let needForm = true; // 是否需要form包裹

  let renderController = null;

  if (propsTemp.type === 'switch') {
    renderController = (
      <Switch
        checkedChildren={propsTemp.checkedChildren}
        unCheckedChildren={propsTemp.unCheckedChildren}
        disabled={propsTemp.disabled === true}
        onChange={(e:any) => {
          propsTemp.onChange && propsTemp.onChange(e.target.value);
        }}
      />
    );
  }

  // 输入框
  if (propsTemp.type === 'input') {
    propsTemp.validateTrigger = 'onBlur';

    renderController = (
      <Input
        type={propsTemp.inputType}
        onClick={propsTemp.onClick}
        placeholder={
          propsTemp.placeholder !== undefined ? propsTemp.placeholder : '请输入'
        }
        className={classnames('view-style', propsTemp.viewStyle)}
        disabled={propsTemp.disabled === true}
        onChange={e => {
          if (propsTemp.id || propsTemp.label) {
            const { value } = e.target;
            propsTemp.form.setFieldsValue({
              [propsTemp.id || propsTemp.label]: value.trim(),
            });
          }
          propsTemp.onChange && propsTemp.onChange(e.target.value);
        }}
        suffix={propsTemp.suffix}
      />
    );
  }

  // 输入框数字
  if (propsTemp.type === 'inputNumber') {
    propsTemp.validateTrigger = 'onBlur';

    renderController = (
      <InputNumber
        {...propsTemp}
        min={propsTemp.min}
        max={propsTemp.max}
        placeholder={
          propsTemp.placeholder !== undefined ? propsTemp.placeholder : '请输入'
        }
        className={classnames('view-style', propsTemp.viewStyle)}
        disabled={propsTemp.disabled === true}
        onChange={value => {
          propsTemp.onChange && propsTemp.onChange(value);
        }}
      />
    );
  }

  // 多行输入框
  if (propsTemp.type === 'textarea') {
    propsTemp.validateTrigger = 'onBlur';

    renderController = (
      <TextArea
        rows={propsTemp.rows === undefined ? 4 : propsTemp.rows}
        placeholder={propsTemp.placeholder}
        className={classnames('view-style', propsTemp.viewStyle)}
        disabled={propsTemp.disabled === true}
        onBlur={e => {
          if (propsTemp.id || propsTemp.label) {
            const { value } = e.target;
            propsTemp.form.setFieldsValue({
              [propsTemp.id || propsTemp.label]: value.trim(),
            });
          }
        }}
        onChange={e => {
          propsTemp.onChange && propsTemp.onChange(e.target.value);
        }}
      />
    );
  }

  // 查询框
  if (propsTemp.type === 'search') {
    propsTemp.validateTrigger = 'onBlur';

    renderController = (
      <Search
        disabled={propsTemp.disabled === true || propsTemp.disabled === 'true'}
        placeholder={propsTemp.placeholder}
        onSearch={propsTemp.onChange}
        className={classnames('view-style', propsTemp.viewStyle)}
        enterButton={propsTemp.enterButton !== false}
        onClick={propsTemp.onClick}
      />
    );
  }

  // 选择框
  // 如果props.filterOption有方法，表示是带输入过滤的选择框模式
  if (propsTemp.type === 'select') {
    const renderOption = (propsTemp.optionData || []).map((option:any) => {
      return (
        <Option key={option.key} value={option.key}>
          {option.value}
        </Option>
      );
    });

    // 输入搜索模式
    let showSearch = false;
    const optionFilterProp = 'children';
    if (propsTemp.filterOption) {
      showSearch = true;
    }

    renderController = (
      <Select
        placeholder={
          propsTemp.placeholder !== undefined ? propsTemp.placeholder : '请选择'
        }
        allowClear={propsTemp.allowClear !== false}
        mode={propsTemp.mode}
        disabled={propsTemp.disabled === true || propsTemp.disabled === 'true'}
        showSearch={showSearch}
        optionFilterProp={optionFilterProp}
        className={classnames('view-style', propsTemp.viewStyle)}
        onChange={propsTemp.onChange}
        filterOption={propsTemp.filterOption}
        dropdownMatchSelectWidth={
          propsTemp.dropdownMatchSelectWidth === undefined
            ? true
            : propsTemp.dropdownMatchSelectWidth
        }
      >
        {renderOption}
      </Select>
    );
  }

  // 日期选择器
  if (propsTemp.type === 'datePicker') {
    renderController = (
      <DatePicker
        className={classnames('view-style', propsTemp.viewStyle)}
        showTime={propsTemp.showTime}
        format={propsTemp.format || 'YYYY-MM-DD'}
        disabled={propsTemp.disabled === true}
        placeholder={propsTemp.placeholder}
        disabledDate={propsTemp.disabledDate}
      />
    );

    propsTemp.value = propsTemp.value ? moment(propsTemp.value) : null;

    // propsTemp.normalize = datePickerNormalize;
  }

  // 月份选择器
  if (propsTemp.type === 'monthPicker') {
    renderController = (
      <MonthPicker
        className={classnames('view-style', propsTemp.viewStyle)}
        // @ts-ignore
        showTime={propsTemp.showTime}
        format={propsTemp.format || 'YYYY-MM'}
        disabled={propsTemp.disabled === true}
        onChange={propsTemp.onChange}
      />
    );

    propsTemp.value = propsTemp.value ? moment(propsTemp.value) : null;

    // propsTemp.normalize = datePickerNormalize;
  }

  if (propsTemp.type === 'rangePicker') {
    renderController = <RangePicker onChange={propsTemp.onChange} />;

    propsTemp.normalize = rangePickerNormalize;
  }


  // 单选框
  if (propsTemp.type === 'radio') {
    const renderOption = (propsTemp.optionData || []).map((option:any) => {
      return (
        <Radio
          key={option.key}
          value={option.key}
          className={'readio-style'}
        >
          {option.value}
        </Radio>
      );
    });

    renderController = (
      <Radio.Group
        disabled={propsTemp.disabled === true || propsTemp.disabled === 'true'}
        className={classnames(
          'view-style',
          'redio-view-style',
          propsTemp.viewStyle,
        )}
        size={propsTemp.size}
        onChange={e => {
          propsTemp.onChange && propsTemp.onChange(e.target.value);
        }}
      >
        {renderOption}
      </Radio.Group>
    );
  }

  // 勾选框
  if (propsTemp.type === 'checkbox') {
    needForm = false;
    const renderOption = (propsTemp.optionData || []).map((option:any) => {
      const onChange = propsTemp.onChange
        ? (e:any) => {
            propsTemp.onChange(option.key, e.target.checked);
          }
        : null;
      const view = (
        <Checkbox
          disabled={option.disabled}
          key={option.key}
          onChange={option.onChange || onChange}
          className={'checkbox-style'}
        >
          {option.value}
        </Checkbox>
      );

      propsTemp.valuePropName = 'checked';
      const { fieldDecoratorView } = fieldDecorator({
        propsTemp: {
          ...propsTemp,
          valuePropName: 'checked',
          id: option.key,
          value: (propsTemp.value || {})[option.key],
        },

        view,
        needForm: true,
      });

      return fieldDecoratorView;
    });

    renderController = (
      <div
        className={classnames('jlt-controller-style', propsTemp.className)}
      >
        <div className={'flex-div'}>
          {propsTemp.label && (
            <div className={propsTemp.labelClass || 'label-text'}>
              {propsTemp.label}:
            </div>
          )}
          <div
            className={classnames('view-style', propsTemp.viewStyle)}
          >
            {renderOption}
          </div>
        </div>
      </div>
    );
  }

  // 范围输入框
  if (propsTemp.type === 'range') {
    const { onChange, minValue, maxValue } = propsTemp;
    renderController = (
      <RanderRange
      // @ts-ignore
        onChange={onChange}
        minValue={minValue}
        maxValue={maxValue}
      />
    );
  }

  if (propsTemp.type === 'cascader') {
    const { expandTrigger, options, placeholder, onChange } = propsTemp;

    renderController = (
      <Cascader
        allowClear
        changeOnSelect
        expandTrigger={expandTrigger}
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        className={classnames('view-style', propsTemp.viewStyle)}
      />
    );

    // cascader需要手写是否必填验证方法，默认方法无法验证[null, null, null]的空值
    // if (propsTemp.required) {
    //   propsTemp.rules = propsTemp.rules || [];
    //   propsTemp.rules.push({
    //     validator: (rule, value, callback) => {
    //       if (!value || value.every(item => !item)) {
    //         callback(`${propsTemp.label}是必填项`);
    //       }
    //       callback();
    //     },
    //   });
    // }
  }

  // 范围输入框
  if (propsTemp.type === 'upload') {
    const { renderChild, action, listType = 'text', uploadProps } = propsTemp;
    // onChange={({ file, fileList }) => {
    //   if (file.status !== 'uploading') {
    //     debugger;
    //     console.log(file, fileList);
    //   }
    // }}
    propsTemp.valuePropName = 'fileList';
    propsTemp.getValueFromEvent = normFile;
    renderController = (
      <Upload
        name="attachment"
        action={action}
        listType={listType}
        className={listType === 'picture-card' && 'upload'}
        beforeUpload={propsTemp.beforeUpload}
        onChange={propsTemp.onChange}
        onPreview={propsTemp.onPreview}
        {...uploadProps}
      >
        {renderChild(propsTemp.value)}
      </Upload>
    );
  }

  // br换行
  if (propsTemp.type === 'br') {
    needForm = false;
    renderController = <br />;
  }

  // 手动传入右侧控件
  if (propsTemp.type === 'empty') {
    needForm = false;
    renderController = (
      <div
        className={classnames('jlt-controller-style', propsTemp.className)}
      >
        <div className={'flex-div'}>
          <div className={propsTemp.labelClass || 'label-text'}>
            {propsTemp.label}
          </div>
          <div className={'wrapper-col'}>
            {propsTemp.render && propsTemp.render()}
          </div>
        </div>
      </div>
    );
  }

  return {
    propsTemp,
    needForm,
    view: renderController,
  };
};

const fieldDecorator = ({ propsTemp, view, needForm }:any) => {
  let fieldDecoratorView = null;

  if (!needForm) {
    return {
      propsTemp,
      needForm,
      view,
      fieldDecoratorView,
    };
  }

  // if ((propsTemp.rules || []).length > 0) {
  //   debugger;
  // }

  const rules = (propsTemp.rules || []).map((rule:any) => {
    rule.fullField = propsTemp.label;
    rule.field = propsTemp.id;
    return rule;
  });

  // const rules = propsTemp.rules || [];

  fieldDecoratorView = propsTemp.form.getFieldDecorator(
    propsTemp.id || propsTemp.label,
    {
      initialValue: propsTemp.value,
      normalize: propsTemp.normalize,
      valuePropName: propsTemp.valuePropName || 'value',
      validateTrigger: propsTemp.validateTrigger || 'onChange',
      getValueFromEvent: propsTemp.getValueFromEvent,
      rules: [
        {
          required: propsTemp.required,
          // fullField: '暂住证',
          message: `${propsTemp.label}是必填项`,
        },
        ...rules,
      ],
    },
  )(view);

  return {
    propsTemp,
    needForm,
    view,
    fieldDecoratorView,
  };
};

const LabelWithController = (props: Props) => {
  const { propsTemp, needForm, view, fieldDecoratorView } = fieldDecorator(
    renderView(props),
  );

  let fieldDecoratorViewTemp = fieldDecoratorView;

  if (!needForm) {
    return view;
  }

  // 不允许用户直接点击，在右侧控件上方增加遮盖层，并触发点击事件
  if (propsTemp.modalOnClick) {
    fieldDecoratorViewTemp = (
      <div
        className={'modal-view'}
        onClick={propsTemp.disabled || propsTemp.modalOnClick}
      >
        {fieldDecoratorViewTemp}
        <div className={'cover-view'} />
        {propsTemp.allowClear &&
          (propsTemp.value !== null && propsTemp.value !== undefined) && (
            <span
            // @ts-ignore
              unselectable="on"
              className="ant-select-selection__clear"
              style={{ userSelect: 'none' }}
              onClick={event => {
                event.stopPropagation();
                propsTemp.allowClear();
              }}
            />
          )}
      </div>
    );
  }

  let extraView = null;
  if (propsTemp.extra) {
    extraView = (
      <div
        className={classnames('extra-style', propsTemp.extraViewStyle)}
      >
        {propsTemp.extra}
      </div>
    );
  }

  return (
    <div
      className={classnames('jlt-controller-style', propsTemp.className)}
    >
      <FormItem
        key={propsTemp.label}
        label={propsTemp.label}
        colon={false}
        required={propsTemp.required}
        className={classnames('flex-div')}
        labelCol={{ className: 'label-text' }}
        wrapperCol={{ className: 'wrapper-col' }}
      >
        <div>
          {fieldDecoratorViewTemp}
          {extraView}
        </div>
      </FormItem>
    </div>
  );
};
//@ts-ignore
LabelWithController.renderView = renderView;
//@ts-ignore
LabelWithController.fieldDecorator = fieldDecorator;

export default LabelWithController;
