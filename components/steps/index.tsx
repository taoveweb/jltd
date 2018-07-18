import * as React from 'react';
import { Steps } from 'antd';

const Step = Steps.Step;

class JltSteps extends React.Component {
  static Step: typeof Step;
  render() {
    return <Steps {...this.props} />;
  }
}

JltSteps.Step = Step;
export default JltSteps;
