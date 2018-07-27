import * as React from 'react';
import PropTypes from 'prop-types';
import { Form, Tabs } from 'antd';
import classNames from 'classnames';
import LoginItem from './LoginItem';
import LoginTab from './LoginTab';
import LoginSubmit from './LoginSubmit';

interface ILoginProp {
  className: string;
  defaultActiveKey: string;
  onTabChange: Function;
  onSubmit: Function;
  form: any;
}

class Login extends React.Component<ILoginProp, any> {
  static Tab: any;
  static UserName: typeof LoginItem;
  static Password: typeof LoginItem;
  static Mobile: typeof LoginItem;
  static Captcha: typeof LoginItem;
  static Submit: typeof LoginSubmit;

  static childContextTypes = {
    tabUtil: PropTypes.object,
    form: PropTypes.object,
    updateActive: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    defaultActiveKey: '',
    onTabChange: () => {},
    onSubmit: () => {},
  };

  constructor(props: ILoginProp) {
    super(props);
    this.state = {
      type: props.defaultActiveKey,
      tabs: [],
      active: {},
    };
  }

  getChildContext() {
    const { tabs } = this.state;
    const { form } = this.props;
    return {
      tabUtil: {
        addTab: (id: any) => {
          this.setState({
            tabs: [...tabs, id],
          });
        },
        removeTab: (id: any) => {
          this.setState({
            tabs: tabs.filter((currentId: any) => currentId !== id),
          });
        },
      },
      form,
      updateActive: (activeItem: any) => {
        const { type, active } = this.state;
        if (active[type]) {
          active[type].push(activeItem);
        } else {
          active[type] = [activeItem];
        }
        this.setState({
          active,
        });
      },
    };
  }

  onSwitch = (type: any) => {
    const { onTabChange } = this.props;
    this.setState({
      type,
    });
    onTabChange(type);
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    const { active, type } = this.state;
    const { form, onSubmit } = this.props;
    const activeFileds = active[type];
    form.validateFields(
      activeFileds,
      { force: true },
      (err: any, values: any) => {
        onSubmit(err, values);
      }
    );
  };

  render() {
    const { className, children }: any = this.props;
    const { type, tabs } = this.state;
    const TabChildren: any[] = [];
    const otherChildren: any[] = [];
    const preCls = 'ant-pro-login';
    React.Children.forEach(children, (item: any) => {
      if (!item) {
        return;
      }
      // eslint-disable-next-line
      if (item.type.__ANT_PRO_LOGIN_TAB) {
        TabChildren.push(item);
      } else {
        otherChildren.push(item);
      }
    });
    return (
      <div className={classNames(className, preCls)}>
        <Form onSubmit={this.handleSubmit}>
          {tabs.length ? (
            <div>
              <Tabs
                animated={false}
                className={'tabs'}
                activeKey={type}
                onChange={this.onSwitch}
              >
                {TabChildren}
              </Tabs>
              {otherChildren}
            </div>
          ) : (
            [...children]
          )}
        </Form>
      </div>
    );
  }
}

Login.Tab = LoginTab;
Login.Submit = LoginSubmit;
Object.keys(LoginItem).forEach((item: any) => {
  (Login as any)[item] = (LoginItem as any)[item];
});

export default Form.create()(Login);
