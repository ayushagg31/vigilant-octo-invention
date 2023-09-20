import { useRouter } from "next/router";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useEffect } from "react";

const Settings = () => {
  return <div>Settings</div>;
};

Settings.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Settings;
