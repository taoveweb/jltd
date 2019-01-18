import * as React from 'react';
import { Spin } from 'antd';

interface IPromiseRenderProps{
 ok?:any
 error?:any
 promise?:any
}

export default class PromiseRender extends React.PureComponent<IPromiseRenderProps,any> {
  state = {
    component: null,
  };

  componentDidMount() {
    this.setRenderComponent(this.props);
  }

  componentWillReceiveProps(nextProps:any) {
    // new Props enter
    this.setRenderComponent(nextProps);
  }

  // set render Component : ok or error
  setRenderComponent(props:any) {
    const ok = this.checkIsInstantiation(props.ok);
    const error = this.checkIsInstantiation(props.error);
    props.promise
      .then(() => {
        this.setState({
          component: ok,
        });
      })
      .catch(() => {
        this.setState({
          component: error,
        });
      });
  }

  // Determine whether the incoming component has been instantiated
  // AuthorizedRoute is already instantiated
  // Authorized  render is already instantiated, children is no instantiated
  // Secured is not instantiated
  checkIsInstantiation = (target:any) => {
    if (!React.isValidElement(target)) {
      return target;
    }
    return () => target;
  };

  render() {
    const { component: Component }:any = this.state;
    return Component ? (
      <Component {...this.props} />
    ) : (
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
}
