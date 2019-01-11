import * as React from 'react';
import { Input, Icon } from 'antd';
import classnames from 'classnames';

const MyInput: any = React.forwardRef((props: any, ref: any) => {
  let { trim = true, onChange, ...rest } = props;
  if (trim) {
    trim = trim;
  }
  return (
    <Input
      ref={ref}
      {...rest}
      onChange={e => {
        if (trim) {
          e.target.value = e.target.value.trim();
        }
        onChange && onChange(e);
      }}
    />
  );
});

class Search extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      showClear: false,
    };
  }

  static getDerivedStateFromProps(props: any, state: any) {
    if (!state.showClear && props.value) {
      return {
        showClear: true,
      };
    }
    return null;
  }

  render() {
    const { allowClear, className, onClear, onChange, getChildRef, ...rest } = this.props;
    const { showClear } = this.state;
    let suffix;
    if (allowClear) {
      suffix = (
        <Icon
          type="close"
          className="my-search-close-icon"
          onClick={() => {
            // @ts-ignore
            this.searchRef.input.input.value = '';
            if (this.props.onChange) {
              this.props.onChange('');
            }
            onClear && onClear();
            this.setState({
              showClear: false,
            });
          }}
        />
      );
    }
    return (
      <Input.Search
        className={classnames(className, { 'my-clear-search': allowClear })}
        onChange={e => {
          e.persist();
          this.setState({ showClear: !!e.target.value });
          onChange && onChange(e);
        }}
        suffix={showClear && suffix}
        ref={e => {
          // @ts-ignore
          this.searchRef = e;
          getChildRef && getChildRef(e);
        }}
        {...rest}
      />
    );
  }
}
MyInput._name = 'Input'
// @ts-ignore
Search._name = 'Search'
// @ts-ignore
Input.TextArea._name = 'TextArea'
MyInput.Search = Search;
MyInput.Group = Input.Group;
MyInput.TextArea = Input.TextArea;
export default MyInput;
