import * as React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, AutoComplete } from 'antd';
import classNames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';

interface IHeaderSearchProps {
  onPressEnter: Function;
  className: any;
  placeholder: any;
}

export default class HeaderSearch extends React.PureComponent<
  IHeaderSearchProps,
  any
> {
  input: any;
  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onSearch: PropTypes.func,
    onPressEnter: PropTypes.func,
    defaultActiveFirstOption: PropTypes.bool,
    dataSource: PropTypes.array,
    defaultOpen: PropTypes.bool,
  };

  static defaultProps = {
    defaultActiveFirstOption: false,
    onPressEnter: () => {},
    onSearch: () => {},
    className: '',
    placeholder: '',
    dataSource: [],
    defaultOpen: false,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      searchMode: props.defaultOpen,
      value: '',
    };
  }

  onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      this.debouncePressEnter();
    }
  };

  onChange = (value: any) => {
    this.setState({ value });
    const { onChange }: any = this.props;
    if (onChange) {
      onChange();
    }
  };

  enterSearchMode = () => {
    this.setState({ searchMode: true }, () => {
      const { searchMode }: any = this.state;
      if (searchMode) {
        this.input.focus();
      }
    });
  };

  leaveSearchMode = () => {
    this.setState({
      searchMode: false,
      value: '',
    });
  };

  debouncePressEnter() {
    const { onPressEnter } = this.props;
    const { value } = this.state;
    onPressEnter(value);
  }

  // NOTE: 不能小于500，如果长按某键，第一次触发auto repeat的间隔是500ms，小于500会导致触发2次
  @Bind()
  @Debounce(500, {
    leading: true,
    trailing: false,
  })
  render() {
    const { className, placeholder, ...restProps }: any = this.props;
    const { searchMode, value } = this.state;
    delete restProps.defaultOpen; // for rc-select not affected
    const inputClass = classNames('input', {
      ['show']: searchMode,
    });
    return (
      <span
        className={classNames(className, 'ant-pro-header-search')}
        onClick={this.enterSearchMode}
      >
        <Icon type="search" key="Icon" />
        <AutoComplete
          key="AutoComplete"
          {...restProps}
          className={inputClass}
          value={value}
          onChange={this.onChange}
        >
          <Input
            placeholder={placeholder}
            ref={node => {
              this.input = node;
            }}
            onKeyDown={this.onKeyDown}
            onBlur={this.leaveSearchMode}
          />
        </AutoComplete>
      </span>
    );
  }
}
