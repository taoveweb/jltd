import * as React from 'react';
import { Avatar, List } from 'antd';
import classNames from 'classnames';
const preCls = 'ant-pro-noticelist';
const Ilist: any = List;
export default function NoticeList({
  data = [],
  onClick,
  onClear,
  title,
  locale,
  emptyText,
  emptyImage,
}: any) {
  if (data.length === 0) {
    return (
      <div className={`${preCls}-notFound`}>
        {emptyImage ? <img src={emptyImage} alt="not found" /> : null}
        <div>{emptyText || locale.emptyText}</div>
      </div>
    );
  }
  return (
    <div>
      <Ilist className={preCls}>
        {data.map((item: any, i: any) => {
          const itemCls = classNames('item', {
            ['read']: item.read,
          });
          return (
            <Ilist.Item
              className={itemCls}
              key={item.key || i}
              onClick={() => onClick(item)}
            >
              <List.Item.Meta
                className={'meta'}
                avatar={
                  item.avatar ? (
                    <Avatar className={'avatar'} src={item.avatar} />
                  ) : null
                }
                title={
                  <div className={'title'}>
                    {item.title}
                    <div className={'extra'}>{item.extra}</div>
                  </div>
                }
                description={
                  <div>
                    <div className={'description'} title={item.description}>
                      {item.description}
                    </div>
                    <div className={'datetime'}>{item.datetime}</div>
                  </div>
                }
              />
            </Ilist.Item>
          );
        })}
      </Ilist>
      <div className={`${preCls}-clear`} onClick={onClear}>
        {locale.clear}
        {title}
      </div>
    </div>
  );
}
