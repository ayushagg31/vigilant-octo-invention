import DashboardLayout from "../components/layout/DashboardLayout";
import PaymentInfo from "../components/settings/PaymentInfo";
import { TabComponent } from "../components/common/TabComponent";
import { Box } from "@chakra-ui/react";

const tabsObject = [
  {
    component: <PaymentInfo />,
    title: <>Payment</>,
  },
];
const Settings = () => {
  return (
    // <Box p={"16"}>
    <TabComponent tabConfig={tabsObject} />
    // </Box>
  );
};

Settings.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Settings;
