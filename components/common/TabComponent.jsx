import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useTabsStyles,
  TabIndicator,
} from "@chakra-ui/react";

export const TabComponent = ({ tabConfig }) => {
  if (tabConfig == undefined) {
    return <div>Provide defined config</div>;
  }
  const tabKeys = Object.keys(tabConfig);
  const tabComponents = Object.values(tabConfig);
  const tabStyle = {
    color: "white",
    bg: "black",
  };

  return (
    <>
      <Tabs position="relative" isFitted variant="unstyled" p={4}>
        <TabList>
          {tabKeys.map((el, index) => (
            <Tab key={index}>{el}</Tab>
          ))}
        </TabList>
        <TabIndicator height="2px" bg="blue.500" mt="-1.5px" />
        <TabPanels>
          {tabComponents.map((component, index) => (
            <TabPanel key={index}>{component}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
};
