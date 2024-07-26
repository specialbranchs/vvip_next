import { User } from "../typings/structures";


export const bol2Int = (bol: boolean) => {
  return bol ? "1" : "0";
};

export const bolToRole = (user: User | null) => {
  if (!user) return 0;
  const makeString =
    bol2Int(user.is_superuser) +
    bol2Int(user.is_adminuser) +
    bol2Int(user.is_staff);
    
  return parseInt(makeString, 2);
};


export const userNavigation = (user: User | null) => {
  let link = "";
  if (user) {
    let priority = bolToRole(user);
    if (priority > 5) {
      link = "/content";
    } else if (priority === 1) {
      link = "/user";
    }
  } else {
    link = "/login";
  }
  return link
};
