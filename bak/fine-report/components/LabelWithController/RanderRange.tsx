import { InputNumber } from 'antd';
import classnames from 'classnames';
import * as React from 'react';

require('./LabelWithController.less');

class RanderRange extends React.Component<any,any> {
  onMaxChange = (maxValue:any) => {
    const { minValue }:any = this.props;
    this.props.onChange(minValue, maxValue);
  };
  onMinChange = (minValue:any) => {
    const { maxValue } = this.props;
    this.props.onChange(minValue, maxValue);
  };
  render() {
    const { minValue, maxValue, min, max } = this.props;
    const minNumber = parseFloat(min)
      ? parseFloat(min)
      : parseFloat(min) === 0 ? 0 : -Infinity;
    const maxNumber = parseFloat(max)
      ? parseFloat(max)
      : parseFloat(max) === 0 ? 0 : Infinity;
    return (
      <div
        className={classnames(
          'jlt-inline-block',
          'jlt-controller-style',
        )}
      >
        <div className={'randerRange-block'}>
          <InputNumber
            className={'randerRange-InputNumber'}
            min={minNumber}
            max={maxNumber}
            value={minValue}
            onChange={this.onMinChange}
          />
          <span>{' ~ '}</span>
          <InputNumber
            className={'randerRange-InputNumber'}
            min={minNumber}
            max={maxNumber}
            value={maxValue}
            onChange={this.onMaxChange}
          />
        </div>
      </div>
    );
  }
}

export default RanderRange;
