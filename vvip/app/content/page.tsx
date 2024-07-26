
import { redirect } from "next/navigation";

const AdminHome = () => {
  redirect("/content/dashboard");
  return null;
};

export default AdminHome;
