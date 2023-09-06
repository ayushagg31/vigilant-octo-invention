import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useTabsStyles,
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
      <Tabs variant="soft-rounded" pt={4} px={4}>
        <TabList>
          {tabKeys.map((el, index) => (
            <Tab key={index} _selected={tabStyle}>
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
