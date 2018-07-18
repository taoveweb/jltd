/* @remove-on-es-build-begin */
// this file is not used if use https://github.com/ant-design/babel-plugin-import
const ENV = process.env.NODE_ENV;
if (
  ENV !== 'production' &&
  ENV !== 'test' &&
  typeof console !== 'undefined' &&
  console.warn &&
  typeof window !== 'undefined'
) {
  console.warn(
    'You are using a whole package of antd, ' +
      'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.'
  );
}
/* @remove-on-es-build-end */
export { default as Icon } from './icon';
export { default as PaginationComponent } from './PaginationComponent';
export { default as EditableCell } from './EditableCell';
export { default as EditTableForm } from './EditTableForm';
export { default as TableComponents } from './TableComponents';
export { default as StandardTable } from './StandardTable';
export { default as RowEditComponents } from './RowEditComponents';
export {default as SelectComponents} from './SelectComponents';
export {default as ExceptionModalComponent} from './ExceptionModalComponents';

export { default as Button } from './button';
export { default as Transfer } from './transfer';
export { default as Affix } from './affix';
export { default as Breadcrumb } from './breadcrumb';
export { default as Dropdown } from './dropdown';
export { default as Menu } from './menu';
export { default as message } from './message';
export { default as Pagination } from './pagination';
export { default as Steps } from './steps';
export { default as AutoComplete } from './auto-complete';
export { default as Cascader } from './cascader';
export { default as Checkbox } from './checkbox';
export {default as DatePicker} from './date-picker';
export {default as Form} from './form';
export {default as Input} from './input';
export {default as InputNumber} from './input-number';
export {default as Mention} from './mention';
export {default as Rate} from './rate';
export {default as Radio} from './radio';
export {default as Select} from './select';
export {default as Slider} from './slider';
export {default as Switch} from './switch';
export {default as TreeSelect} from './tree-select';
export {default as TimePicker} from './time-picker';
export {default as Upload} from './upload';

export {default as Avatar} from './avatar';
export {default as Badge} from './badge';
export {default as Calendar} from './calendar';
export {default as Card} from './card';
export {default as Carousel} from './carousel';
export {default as Collapse} from './collapse';
export {default as List} from './list';
export {default as Table} from './table';
export {default as Tabs} from './tabs';
export {default as Popover} from './popover';
export {default as Tooltip} from './tooltip';
export {default as Tag} from './tag';
export {default as Timeline} from './timeline';
export {default as Tree} from './tree';

export {default as Alert} from './alert';
export {default as Modal} from './modal';
export {default as Progress} from './progress';
export {default as Popconfirm} from './popconfirm';
export {default as Spin} from './spin';

export {default as Anchor} from './anchor';
export {default as BackTop} from './back-top';
export {default as Divider} from './divider';

export {default as Col} from './col';
export {default as Row} from './row';
export {default as LocaleProvider} from './locale-provider';


