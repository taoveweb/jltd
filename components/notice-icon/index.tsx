import { PureComponent } from 'react';
import * as React from 'react';
import { Popover, Icon, Tabs, Badge, Spin } from 'antd';
import classNames from 'classnames';
import List from './NoticeList';
const preCls = 'ant-pro-popover';

const { TabPane } = Tabs;
interface INoticeIconProps {
  children: any;
  onItemClick: any;
  onTabChange: any;
  oading: any;
  locale: any;
  onClear: any;
  loading: any;
  className: any;
  count: any;
  popupAlign: any;
  onPopupVisibleChange: any;
  popupVisible: any;
}

interface INoticeIconState {
  tabType?: any;
}
export default class NoticeIcon extends PureComponent<
  INoticeIconProps,
  INoticeIconState
> {
  static Tab = TabPane;

  static defaultProps = {
    onItemClick: () => {},
    onPopupVisibleChange: () => {},
    onTabChange: () => {},
    onClear: () => {},
    loading: false,
    locale: {
      emptyText: '暂无数据',
      clear: '清空',
    },
    emptyImage:
      'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
  };

  constructor(props: INoticeIconProps) {
    super(props);
    let tabType = '';
    if (props.children && props.children[0]) {
      tabType = props.children[0].props.title;
    }
    this.state = { tabType };
  }
  onItemClick = (item: any, tabProps: any) => {
    const { onItemClick } = this.props;
    onItemClick(item, tabProps);
  };
  onTabChange = (tabType: any) => {
    this.setState({ tabType });
    const { onTabChange } = this.props;
    onTabChange(tabType);
  };
  getNotificationBox() {
    const { children, loading, locale, onClear } = this.props;
    if (!children) {
      return null;
    }
    const panes = React.Children.map(children, (child: any) => {
      const title =
        child.props.list && child.props.list.length > 0
          ? `${child.props.title} (${child.props.list.length})`
          : child.props.title;
      return (
        <TabPane tab={title} key={child.props.title}>
          <List
            {...child.props}
            data={child.props.list}
            onClick={(item: any) => this.onItemClick(item, child.props)}
            onClear={() => onClear(child.props.title)}
            title={child.props.title}
            locale={locale}
          />
        </TabPane>
      );
    });
    return (
      <Spin spinning={loading} delay={0}>
        <Tabs className={'${preCls}-tabs'} onChange={this.onTabChange}>
          {panes}
        </Tabs>
      </Spin>
    );
  }
  render() {
    const {
      className,
      count,
      popupAlign,
      onPopupVisibleChange,
      popupVisible,
    } = this.props;
    const noticeButtonClass = classNames(className, '${preCls}-noticeButton');
    const notificationBox = this.getNotificationBox();
    const trigger = (
      <span className={noticeButtonClass}>
        <Badge count={count} className={'${preCls}-badge'}>
          <Icon type="bell" className={'${preCls}-icon'} />
        </Badge>
      </span>
    );
    if (!notificationBox) {
      return trigger;
    }
    const popoverProps: any = {};
    if ('popupVisible' in this.props) {
      popoverProps.visible = popupVisible;
    }
    return (
      <Popover
        placement="bottomRight"
        content={notificationBox}
        popupClassName={preCls}
        trigger="click"
        arrowPointAtCenter
        popupAlign={popupAlign}
        onVisibleChange={onPopupVisibleChange}
        {...popoverProps}
      >
        {trigger}
      </Popover>
    );
  }
}
