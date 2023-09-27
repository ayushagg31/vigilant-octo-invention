import DashboardLayout from "../components/layout/DashboardLayout";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Profile = () => {
  return <Box p="16">Profile</Box>;
};

Profile.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Profile;
