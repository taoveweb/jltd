import url from '../_util/url';
import * as $ from 'jquery';
let permissionMap: any = null;
const getPermissionMap = () => {
  permissionMap = {};
  /* eslint-disable react/no-namespace */
  $.ajax({
    url: url.nav.getButtonPermission(),
    data: {},
    cache: false,
    async: false,
    type: 'POST',
    dataType: 'json',
    success: function(data: any) {
      permissionMap = data.data;
    },
  });
  return permissionMap;
};
const buttonPermission = {
  check(buttonOpt: any) {
    if (permissionMap === null) {
      permissionMap = getPermissionMap();
    }
    if (!buttonOpt.menuCode || !buttonOpt.operateCode) {
      return true;
    }
    if (permissionMap === null) {
      return false;
    }
    const operateCodeMap = permissionMap[buttonOpt.menuCode] || [];
    if (!operateCodeMap.hasOwnProperty(buttonOpt.operateCode)) {
      return false;
    }
    const operateName = operateCodeMap[buttonOpt.operateCode];
    if (operateName && operateName != '') {
      buttonOpt.text = operateCodeMap[buttonOpt.operateCode];
    }
    return true;
  },
  filterPermission(buttonOptList: any) {
    return buttonOptList.filter((opt: any) => {
      if (opt.children && opt.children.length > 0) {
        const filterChidrenList = buttonPermission.filterPermission(
          opt.children
        );
        if (filterChidrenList.length === 0) {
          return false;
        }
        opt.children = filterChidrenList;
      }
      if (!opt.menuCode || !opt.operateCode) {
        return true;
      }
      return buttonPermission.check(opt);
    });
  },
};
export default buttonPermission;
