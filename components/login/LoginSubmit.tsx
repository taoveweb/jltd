import * as React from 'react';
import classNames from 'classnames';
import { Button, Form } from 'antd';

const FormItem = Form.Item;

const LoginSubmit = ({ className, ...rest }: any) => {
  const clsString = classNames('submit', className);
  return (
    <FormItem>
      <Button
        size="large"
        className={clsString}
        type="primary"
        htmlType="submit"
        {...rest}
      />
    </FormItem>
  );
};

export default LoginSubmit;
