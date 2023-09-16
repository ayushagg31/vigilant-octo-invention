import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";

export const TabComponent = ({ tabConfig }) => {
  if (tabConfig == undefined) {
    return <div>Provide defined config</div>;
  }
  const tabKeys = tabConfig.map((tab) => tab.title);
  const tabComponents = tabConfig.map((tab) => tab.component);

  return (
    <>
      <Tabs position="relative" isFitted variant="unstyled" p={4}>
        <TabList>
          {tabKeys.map((el, index) => (
            <Tab
              style={{ gap: 12 }}
              fontSize={{ base: "14px", md: "16px" }}
              key={index}
            >
              {el}
            </Tab>
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
