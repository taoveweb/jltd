import 'rc-drawer/assets/index.css';
import * as React from 'react';
// @ts-ignore
import DrawerMenu from 'rc-drawer';
import SiderMenu from './siderMenu';
const SiderMenuWrapper = (props: any) => {
  const { isMobile, collapsed } = props;
  return isMobile ? (
    <DrawerMenu
      getContainer={null}
      level={null}
      handleChild={<i className="drawer-handle-icon" />}
      onHandleClick={() => {
        props.onCollapse(!collapsed);
      }}
      open={!collapsed}
      onMaskClick={() => {
        props.onCollapse(true);
      }}
    >
      <SiderMenu {...props} collapsed={isMobile ? false : collapsed} />
    </DrawerMenu>
  ) : (
    <SiderMenu {...props} />
  );
};
export default SiderMenuWrapper;
