import DashboardLayout from "../components/layout/DashboardLayout";
import Insights from "../components/usage/Insights";
import { TabComponent } from "../components/common/TabComponent";
import { Box } from "@chakra-ui/react";
import PricingInfo from "../components/landing/PricingInfo";
import Head from "next/head";

const tabsObject = [
  {
    component: <PricingInfo />,
    title: "Pricing",
  },
  {
    component: <Insights />,
    title: "Activity Insights",
  },
];
const Usage = () => {
  return (
    <>
    <Head>
       <title>Pricing & Usage | YourPDF.chat </title>
    </Head>
    <Box p={{ base: "8", xs: "16" }} pt="20" m="auto">
      <TabComponent tabConfig={tabsObject} />
    </Box>
    </>
  );
};

Usage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Usage;
