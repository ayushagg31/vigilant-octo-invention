import DashboardLayout from "../components/layout/DashboardLayout";
import UserCurrentPlanInfo from "../components/usage/UserCurrentPlanInfo";
import { TabComponent } from "../components/common/TabComponent";
import { Box } from "@chakra-ui/react";

const tabsObject = [
  {
    component: <UserCurrentPlanInfo />,
    title: "Pricing & Usage"
  },
];
const Usage = () => {
  return (
    <Box p={{ base: "8", xs: "16" }} pt="20" m="auto">
      <TabComponent tabConfig={tabsObject} />
    </Box>
  );
};

Usage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Usage;
