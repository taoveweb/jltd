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
export { default as Button } from './button';
