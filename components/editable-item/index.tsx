import * as React from 'react';
import { Input, Icon } from 'antd';
interface IEditableItem {
  value?: any;
  onChange?: any;
}
export default class EditableItem extends React.PureComponent<
  IEditableItem,
  any
> {
  constructor(props: IEditableItem) {
    super(props);
    this.state = {
      value: props.value,
      editable: false,
    };
  }

  handleChange = (e: any) => {
    const { value } = e.target;
    this.setState({ value });
  };

  check = () => {
    this.setState({ editable: false });
    const { onChange } = this.props;
    const { value } = this.state;
    if (onChange) {
      onChange(value);
    }
  };

  edit = () => {
    this.setState({ editable: true });
  };

  render() {
    const { value, editable } = this.state;
    return (
      <div className={'ant-pro-editableItem'}>
        {editable ? (
          <div className={'wrapper'}>
            <Input
              value={value}
              onChange={this.handleChange}
              onPressEnter={this.check}
            />
            <Icon type="check" className={'icon'} onClick={this.check} />
          </div>
        ) : (
          <div className={'wrapper'}>
            <span>{value || ' '}</span>
            <Icon type="edit" className={'icon'} onClick={this.edit} />
          </div>
        )}
      </div>
    );
  }
}
