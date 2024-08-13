import { makeRoute } from "../routes/appRoutes";
import { RouteType } from "../routes/config";
import { User } from "../typings/structures";

export const routeArray = (routeList: RouteType[]) => {
  const arr: string[] = [];
  routeList.forEach((item) => {
    if (item.only_read) {
    } else {
      arr.push(item.path);
    }
    if (item.child) {
      item.child.forEach((res) => {
        if (res.only_read) {
        } else {
          arr.push(res.path);
        }
      });
    }
  });
  return arr;
};

export const restrictPath = (pathname: string, user: User) => {
  const routeList = routeArray(makeRoute(user));
  let flag = false;
  routeList.forEach((res) => {
    if (pathname.includes(res)) {
      flag = true;
      return;
    }
  });
  return flag;
};
