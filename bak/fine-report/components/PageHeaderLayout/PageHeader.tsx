import { Button, Icon } from 'antd';
import classNames from 'classnames';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import * as React from 'react';

require('./PageHeader.less');


class PageHeader extends React.PureComponent<any,any> {
  static contextTypes = {
    routes: PropTypes.array,
    params: PropTypes.object,
    location: PropTypes.object,
  };

  onChange = (key:any) => {
    if (this.props.onTabChange) {
      this.props.onTabChange(key);
    }
  };

  backOnClick = () => {
    this.props.dispatch(routerRedux.goBack());
  };

  renderTitle(title?: string) {
    if (!title) {
      return null;
    }

    return (
      <div className={'title_block'}>
        <div className={'blue_block'} />
        <h1 className={'title'}>{title}</h1>
      </div>
    );
  }

  render() {
    const { title, showBackBtn, className } = this.props;
    const clsString = classNames("jlt-pageHeader", className);

    return (
      <div className={clsString}>
        <div className={'row'}>{this.renderTitle(title)}</div>
        <div className={'row'}>
          {showBackBtn && (
            <Button
              type="ghost"
              onClick={() => {
                this.props.showBackCb && this.props.showBackCb();
                this.backOnClick();
              }}
            >
              <Icon type="rollback" />
              返回
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default connect()(PageHeader);
