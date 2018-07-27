import * as React from 'react';
import classNames from 'classnames';
import { Tag, Icon } from 'antd';

const { CheckableTag } = Tag;
const TagSelectOption: any = ({ children, checked, onChange, value }: any) => (
  <CheckableTag
    checked={checked}
    key={value}
    onChange={(state: any) => onChange(value, state)}
  >
    {children}
  </CheckableTag>
);
TagSelectOption.isTagSelectOption = true;

export interface ITagSelectProps {
  onChange?: (value: string[]) => void;
  expandable?: boolean;
  value?: string[] | number[];
  className?: string;
  prefixCls?: string;
  defaultValue?: string[] | number[];
  style?: React.CSSProperties;
}
class TagSelect extends React.Component<ITagSelectProps, any> {
  public static Option: typeof TagSelectOption;

  constructor(props: ITagSelectProps) {
    super(props);
    this.state = {
      expand: false,
      value: props.value || props.defaultValue || [],
    };
  }
  componentWillReceiveProps(nextProps: ITagSelectProps) {
    if ('value' in nextProps && nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }
  onChange = (value: any) => {
    const { onChange } = this.props;
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    if (onChange) {
      onChange(value);
    }
  };
  onSelectAll = (checked: any) => {
    let checkedTags = [];
    if (checked) {
      checkedTags = this.getAllTags();
    }
    this.onChange(checkedTags);
  };
  getAllTags() {
    let { children } = this.props;
    children = React.Children.toArray(children) as Array<any>;

    const checkedTags = (children as Array<any>)
      .filter((child: any) => this.isTagSelectOption(child))
      .map((child: any) => child.props.value);
    return checkedTags || [];
  }
  handleTagChange = (value: any, checked: any) => {
    const { value: v } = this.state;
    const checkedTags = [...v];
    const index = checkedTags.indexOf(value);
    if (checked && index === -1) {
      checkedTags.push(value);
    } else if (!checked && index > -1) {
      checkedTags.splice(index, 1);
    }
    this.onChange(checkedTags);
  };
  handleExpand = () => {
    const { expand } = this.state;
    this.setState({
      expand: !expand,
    });
  };
  isTagSelectOption = (node: any) => {
    return (
      node &&
      node.type &&
      (node.type.isTagSelectOption ||
        node.type.displayName === 'TagSelectOption')
    );
  };
  render() {
    const { value, expand } = this.state;
    const {
      children,
      className,
      style,
      expandable,
      prefixCls = 'ant-tagSelect',
    } = this.props;
    const checkedAll = this.getAllTags().length === value.length;
    const cls = classNames(prefixCls, className, {
      [`${prefixCls}-hasExpandTag`]: expandable,
      [`${prefixCls}-expanded`]: expand,
    });
    return (
      <div className={cls} style={style}>
        <CheckableTag
          checked={checkedAll}
          key="tag-select-__all__"
          onChange={this.onSelectAll}
        >
          全部
        </CheckableTag>
        {value &&
          React.Children.map(children, (child: any) => {
            if (this.isTagSelectOption(child)) {
              return React.cloneElement(child, {
                key: `tag-select-${child.props.value}`,
                value: child.props.value,
                checked: value.indexOf(child.props.value) > -1,
                onChange: this.handleTagChange,
              });
            }
            return child;
          })}
        {expandable && (
          <a className={`${prefixCls}-trigger`} onClick={this.handleExpand}>
            {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
          </a>
        )}
      </div>
    );
  }
}
TagSelect.Option = TagSelectOption;
export default TagSelect;
