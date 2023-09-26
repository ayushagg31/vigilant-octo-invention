import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useAPILoader } from "../../hooks/useApiHook";
export const TabComponent = ({ tabConfig }) => {
  const { loader } = useAPILoader();

  if (tabConfig == undefined) {
    return <div>Provide defined config</div>;
  }
  const tabKeys = tabConfig.map((tab) => tab.title);
  const tabComponents = tabConfig.map((tab) => tab.component);

  return (
    <>
      <Tabs
        position="relative"
        style={{ boxShadow: "0 0 12px 0 #777", background: "#171923" }}
        isFitted
        w={{ base: "90%", md: "70%" }}
        rounded={"xl"}
        zIndex={"999"}
        p="2"
        variant="soft-rounded"
      >
        <TabList py={3} cursor={loader ? "not-allowed" : "auto"}>
          {tabKeys.map((el, index) => (
            <Tab
              style={{ gap: 12 }}
              fontSize={{ base: "14px", md: "16px" }}
              key={index}
              color={"#fff"}
              pointerEvents={loader ? "none" : "auto"}
              _selected={{
                color: "#fff",
                border: "2px solid #37A169",
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
