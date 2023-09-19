import { useRouter } from "next/router";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useEffect } from "react";

const Profile = () => {
  return <div>Profile</div>;
};

Profile.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Profile;
