import * as React from 'react';
import { Form, Row, Col, Button, Icon } from 'antd';
const FormItem = Form.Item;
import { setValuesFunction } from './utils';

class AdvancedSearchForm extends React.Component<any, any> {
  state = {
    expand: false,
  };
  datePicker: any = {};

  componentDidMount() {
    this.getFormat();
    setValuesFunction(this);
  }

  getFormat(update?: boolean) {
    this.datePicker = {};
    this.props.datas &&
      this.props.datas.map((item: any) => {
        let type = item && item.node && item.node.type && item.node.type._name;
        if (!type) {
          return;
        }
        if (
          type === 'DatePicker' ||
          type === 'JDatePicker' ||
          type === 'RangePicker' ||
          type === 'MonthPicker' ||
          type === 'WeekPicker'
        ) {
          this.datePicker[item.fileId || item.id] = item.node.props.format;
          // if(item.node.type.rangePicker){
          //   item.defaultProps = {
          //     placeholder: item.node.props['placeholder'] || ['请选择','请选择'],
          //   };
          // }
          // else{
          //   item.defaultProps = {
          //     placeholder: item.node.props['placeholder'] || '请选择',
          //   };
          // }
        } else if (type === 'Input' || type === 'Search' || type === 'JInput') {
          item.defaultProps = {
            placeholder: item.node.props['placeholder'] || '请输入',
            maxLength: item.node.props['maxLength'] || 50,
          };
        } else if (type === 'Select' || type === 'JSelect') {
          item.defaultProps = {
            placeholder: item.node.props['placeholder'] || '请选择',
          };
        } else if (type === 'TextArea') {
          item.defaultProps = {
            placeholder: item.node.props['placeholder'] || '请输入',
            maxLength: item.node.props['maxLength'] || 200,
          };
        }
      });
    if (!update) {
      setTimeout(() => {
        this.forceUpdate();
      }, 100);
    }
  }

  handleSearch = (e: any) => {
    e.preventDefault();
    if (this.props.onSearchClick) {
      this.props.onSearchClick(e);
    } else {
      this.props.form.validateFields((_err: any, values: any) => {
        console.log('Received values of form: ', values);
      });
    }
  };

  handleReset = () => {
    this.props.form.resetFields();
    this.props.onResetClick && this.props.onResetClick();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  // To generate mock Form.Item
  getFields() {
    const { datas, isSearch, showDetail, colon = false } = this.props;
    let count = !isSearch || this.state.expand ? 100 : 6;

    const { getFieldDecorator } = this.props.form;
    const children = [];

    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];
      // if(item.hide){
      //   continue;
      // }
      // 正常表单
      let spann = 8;
      let options = { ...item.options, rules: item.rules || [] };
      if (this.props.isModal) {
        // 弹出框
        spann = 12;
      }
      // 有设置具体值的  8,16,24
      if (item.span) {
        spann = item.span;
      }
      if (item.value || item.initialValue) {
        options.initialValue = item.value || item.initialValue;
      }
      if (item.hide && i < count) {
        count++;
      }
      children.push(
        <Col
          span={spann}
          offset={item.wrap || 0}
          pull={item.wrap || 0}
          key={i}
          style={{ display: i < count && !item.hide ? 'block' : 'none' }}
        >
          {showDetail ? (
            <div className="detail-label">
              <span className="info-label">
                {item.label}
                {(item.colon || colon || false) && ':'}
              </span>
              <span className="info-value">{item.node}</span>
            </div>
          ) : (
            <FormItem
              colon={item.colon || colon || false}
              {...item.item}
              labelCol={{
                xs: { span: 24 },
                sm: { span: 3 },
                xl: { span: 6 },
              }}
              label={item.label}
            >
              {item.render
                ? item.render()
                : getFieldDecorator(item.id || item.fileId || item.label, options)(
                    React.cloneElement(
                      item.node,
                      { ...item.defaultProps, ...item.node.props },
                      item.node.props.children
                    )
                  )}
            </FormItem>
          )}
        </Col>
      );
    }
    return children;
  }

  renderSearchBtn = () => {
    if (!this.props.isSearch) {
      return null;
    }
    let showMore = this.props.datas.filter((item: any) => !item.hide).length > 6;

    return (
      <Row className="ant-advanced-search-form-btn">
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button className="ant-btn-primary" htmlType="submit">
              搜索
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
          </Col>
        </Row>
        <Row>
          {showMore && (
            <a style={{ fontSize: 14, marginTop: 23, display: 'block' }} onClick={this.toggle}>
              {this.state.expand ? '收起' : '更多'}
              <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          )}
        </Row>
      </Row>
    );
  };

  render() {
    let rowClass = 'ant-advanced-search-form-flex';
    if (this.props.isModal) {
      rowClass = 'ant-advanced-search-form-flex ant-advanced-search-form-modal';
    }
    return (
      <Form
        className="ant-advanced-search-form"
        style={this.props.style || {}}
        onSubmit={this.handleSearch}
      >
        <Row className={rowClass} gutter={12} type="flex">
          {this.getFields()}
        </Row>
        {this.renderSearchBtn()}
      </Form>
    );
  }
}

export default Form.create()(AdvancedSearchForm);
