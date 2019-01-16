import { Button, Popconfirm } from 'antd';

const getOptionDataText = (list: Array<any>, value: any) => {
  let text = null;
  list &&
    list.some((data: any) => {
      if (!data || data.value !== value) {
        return false;
      }

      text = data.text;
      return true;
    });

  return text || value; // 找不到对应值，显示value
};

const searchButtonGroup = (buttonList: Array<any> = []) => {
  return buttonList.map((buttonInfo: any) => {
    const renderButton = (
      <Button
        className={'button-group'}
        type={getOptionDataText([], buttonInfo.type)}
        size={buttonInfo.size || 'default'}
        onClick={buttonInfo.onClick}
      >
        {buttonInfo.text}
      </Button>
    );
    const renderPopconfirm = (
      <Popconfirm
        placement="topRight"
        title={buttonInfo.popconfirmText}
        onConfirm={buttonInfo.onClick}
        okText="确定"
        cancelText="取消"
      >
        <Button
          className={'button-group'}
          type="primary"
          size={buttonInfo.size || 'default'}
        >
          {buttonInfo.text}
        </Button>
      </Popconfirm>
    );
    return (
      <span key={buttonInfo.text}>
        {buttonInfo.isPopconfirm ? renderPopconfirm : renderButton}
      </span>
    );
  });
};
export default searchButtonGroup;
