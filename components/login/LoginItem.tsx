import * as React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col } from 'antd';
import omit from 'omit.js';
import map from './map';

const FormItem = Form.Item;

interface IBasicComponentProp {
  name: any;
  onGetCaptcha: any;
  onChange: any;
  defaultValue: any;
  rules: any;
}

function generator({ defaultProps, defaultRules, type }: any) {
  return (WrappedComponent: any) => {
    return class BasicComponent extends React.Component<
      IBasicComponentProp,
      any
    > {
      interval: any;
      static contextTypes = {
        form: PropTypes.object,
        updateActive: PropTypes.func,
      };

      constructor(props: IBasicComponentProp) {
        super(props);
        this.state = {
          count: 0,
        };
      }

      componentDidMount() {
        const { updateActive } = this.context;
        const { name } = this.props;
        if (updateActive) {
          updateActive(name);
        }
      }

      componentWillUnmount() {
        clearInterval(this.interval);
      }

      onGetCaptcha = () => {
        let count = 59;
        this.setState({ count });
        const { onGetCaptcha } = this.props;
        if (onGetCaptcha) {
          onGetCaptcha();
        }
        this.interval = setInterval(() => {
          count -= 1;
          this.setState({ count });
          if (count === 0) {
            clearInterval(this.interval);
          }
        }, 1000);
      };

      render() {
        const { form } = this.context;
        const { getFieldDecorator } = form;
        const options: any = {};
        let otherProps = {};
        const {
          onChange,
          defaultValue,
          rules,
          name,
          ...restProps
        } = this.props;
        const { count } = this.state;
        options.rules = rules || defaultRules;
        if (onChange) {
          options.onChange = onChange;
        }
        if (defaultValue) {
          options.initialValue = defaultValue;
        }
        otherProps = restProps || otherProps;
        if (type === 'Captcha') {
          const inputProps = omit(otherProps, ['onGetCaptcha']);
          return (
            <FormItem>
              <Row gutter={8}>
                <Col span={16}>
                  {getFieldDecorator(name, options)(
                    <WrappedComponent {...defaultProps} {...inputProps} />
                  )}
                </Col>
                <Col span={8}>
                  <Button
                    disabled={count}
                    className={'getCaptcha'}
                    size="large"
                    onClick={this.onGetCaptcha}
                  >
                    {count ? `${count} s` : '获取验证码'}
                  </Button>
                </Col>
              </Row>
            </FormItem>
          );
        }
        return (
          <FormItem>
            {getFieldDecorator(name, options)(
              <WrappedComponent {...defaultProps} {...otherProps} />
            )}
          </FormItem>
        );
      }
    };
  };
}

const LoginItem = {};
const imap: any = map;
Object.keys(imap).forEach(item => {
  (LoginItem as any)[item] = generator({
    defaultProps: imap[item].props,
    defaultRules: imap[item].rules,
    type: item,
  })(imap[item].component);
});

export default LoginItem;
