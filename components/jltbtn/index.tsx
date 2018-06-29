import Button from './button';
import ButtonGroup from './button-group';

export { ButtonProps, ButtonShape, ButtonSize, ButtonType } from './button';
export { ButtonGroupProps } from './button-group';

Button.Group = ButtonGroup;

import * as React from 'react';
export default class Jltbtn extends React.Component {
  render() {
    return <Button {...this.props} />;
  }
}
