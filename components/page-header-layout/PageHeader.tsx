import classNames from 'classnames';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import * as React from 'react';
const PureComponent = React.PureComponent;
export interface JCardProps{
  title:String,
  showBackBtn:boolean,
  className?:String,
  dispatch?:any;
}
class PageHeader extends PureComponent<JCardProps> {
  static contextTypes = {
    routes: PropTypes.array,
    params: PropTypes.object,
    location: PropTypes.object,
  };

  backOnClick = () => {
    this.props.dispatch(routerRedux.goBack());
  };

  renderTitle = (title:any) => {
    if (!title) {
      return null;
    }

    return (
      <div className={classNames('title_block')}>
        <div className={classNames('blue_block')} />
        <h1 className={classNames('title_text')}>{title}</h1>
      </div>
    );
  };

  render() {
    const { title, showBackBtn, className } = this.props;
    const clsString = classNames('pageHeader', className);

    return (
      <div className={clsString}>
        <div className={classNames('page_row')}>{this.renderTitle(title)}</div>
        <div className={classNames('page_row')}>
          {showBackBtn && (
            <Button type="ghost" onClick={this.backOnClick}>
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
