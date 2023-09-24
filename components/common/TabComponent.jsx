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
  //#50c878
  return (
    <>
      <Tabs
        className="dark-bg2 dark-bg2-shadow"
        position="relative"
        isFitted
        w={{ base: "90%", md: "70%" }}
        rounded={"xl"}
        zIndex={'999'}
        p="2"
        variant='soft-rounded'
      >
        <TabList py={3}>
          {tabKeys.map((el, index) => (
            <Tab
              style={{ gap: 12 }}
              fontSize={{ base: "14px", md: "16px" }}
              key={index}
              color={'#fff'}
              _selected={{
                color: '#fff', fontWeight: 'light', border: "1px",
              }}

            >
              {el}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabComponents.map((component, index) => (
            <TabPanel key={index}>{component}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
};
