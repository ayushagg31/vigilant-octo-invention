import DashboardLayout from "../components/layout/DashboardLayout";
import UserCurrentPlanInfo from "../components/settings/UserCurrentPlanInfo";
import { TabComponent } from "../components/common/TabComponent";
import { Box } from "@chakra-ui/react";
import UserSetting from "../components/settings/UserSetting";

const tabsObject = [
  {
    component: <UserCurrentPlanInfo />,
    title: <>Payment</>,
  },
  {
    component: <UserSetting />,
    title: <>Settings</>,
  },
];
const Settings = () => {
  return (
    <Box p={{ base: "8", xs: "16" }} pt="20" m="auto">
      <TabComponent tabConfig={tabsObject} />
    </Box>
  );
};

Settings.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Settings;
