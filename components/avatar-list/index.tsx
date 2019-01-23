import * as React from 'react';
import { Tooltip, Avatar } from 'antd';
import classNames from 'classnames';


const AvatarList = ({ children, size, ...other }:any) => {
  const childrenWithProps = React.Children.map(children, (child:any) =>
    React.cloneElement(child, {
      size,
    })
  );

  return (
    <div {...other} className={"avatar-list-avatarList"}>
      <ul> {childrenWithProps} </ul>
    </div>
  );
};

const Item = ({ src, size, tips, onClick = () => {} }:any) => {
  const cls = classNames("avatar-list-avatarItem", {
    ['avatar-list-avatarItemLarge']: size === 'large',
    ['avatar-list-avatarItemSmall']: size === 'small',
    ['avatar-list-avatarItemMini']: size === 'mini',
  });

  return (
    <li className={cls} onClick={onClick}>
      {tips ? (
        <Tooltip title={tips}>
          <Avatar src={src} size={size} style={{ cursor: 'pointer' }} />
        </Tooltip>
      ) : (
        <Avatar src={src} size={size} />
      )}
    </li>
  );
};

(AvatarList as any).Item = Item;

export default AvatarList;
