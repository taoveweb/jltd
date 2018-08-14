import * as React from 'react';
import { InputNumber } from 'antd';
import classnames from 'classnames';
// const styles = require('./style/index');


interface RanderRangeProps {
  onChange?: any;
  minValue?: any;
  maxValue?: any;
  min?: any;
  max?: any;
}

class RanderRange extends React.Component<RanderRangeProps, {}> {
  onMaxChange = (maxValue: any) => {
    const { minValue } = this.props;
    this.props.onChange(minValue, maxValue);
  };
  onMinChange = (minValue: any) => {
    const { maxValue } = this.props;
    this.props.onChange(minValue, maxValue);
  };
  render() {
    const { minValue, maxValue, min, max } = this.props;
    const minNumber = parseFloat(min)
      ? parseFloat(min)
      : parseFloat(min) === 0
        ? 0
        : -Infinity;
    const maxNumber = parseFloat(max)
      ? parseFloat(max)
      : parseFloat(max) === 0
        ? 0
        : Infinity;
    return (
      <div
        className={classnames(
          'inline-block',
          'ant-label-controller-style'
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
