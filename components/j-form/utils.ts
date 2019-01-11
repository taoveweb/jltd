import * as moment from 'moment';

export function setValuesFunction(_this: any) {
  _this.props.form.values = (params?: any) => {
    let data = _this.props.form.getFieldsValue(params);
    let result: any = {};
    Object.keys(data).map((item: any) => {
      let format = _this.datePicker[item];
      if (data[item]) {
        if (Array.isArray(data[item])) {
          result[`${item}`] = [];
          data[item].map((item2: any, index: any) => {
            if (moment.isMoment(item2)) {
              result[`${item}`][index] = data[item][index].format(format);
              if (index == 0) {
                result[`${item}From`] = item2.format(format);
              } else if (index == 1) {
                result[`${item}To`] = item2.format(format);
              }
            }
            else{
              result[`${item}`][index] = data[item][index]
            }
          });
        } else if (moment.isMoment(data[item])) {
          result[`${item}`] = data[item].format(format);
        } else {
          result[item] = data[item];
        }
      } else {
        result[item] = data[item];
      }
    });
    return result;
  };
  if (_this.props.getRefForm) {
    _this.props.getRefForm(_this.props.form);
  }
}
