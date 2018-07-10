import * as React from 'react';
import { Button } from 'antd';
const Group = Button.Group;
class JltButton extends React.Component {
  static Group: typeof Group;
  render() {
    return <Button {...this.props} />;
  }
}

JltButton.Group = Group;
export default JltButton;
