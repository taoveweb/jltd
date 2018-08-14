import { PureComponent, createElement } from 'react';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

// TODO: 添加逻辑

class EditableLinkGroup extends PureComponent {
  static propTypes = {
    links: PropTypes.array,
    onAdd: PropTypes.func,
    linkElement: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  };

  static defaultProps = {
    links: [],
    onAdd: () => {},
    linkElement: 'a',
  };

  render() {
    const { links, linkElement, onAdd }: any = this.props;
    return (
      <div className={'ant-pro-linkGroup'}>
        {links.map((link: any) =>
          createElement(
            linkElement,
            {
              key: `linkGroup-item-${link.id || link.title}`,
              to: link.href,
              href: link.href,
            },
            link.title
          )
        )}
        {
          <Button size="small" type="primary" ghost onClick={onAdd} icon="plus">
            添加
          </Button>
        }
      </div>
    );
  }
}

export default EditableLinkGroup;
