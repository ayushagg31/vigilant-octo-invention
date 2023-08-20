import React from "react";
import Example from "./Example";
import TabsSection from "./TabsSection";
import { FileUploadSection } from "./FileUploadSection";
import { FromUrl } from "./FromUrl";
import { FromText } from "./FromText";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


export const BeforeUpload = () => {
  const tabConfig = {
    'Upload File': <FileUploadSection />,
    'From Url': <FromUrl />,
    'From Text': <FromText />
  };

  const tabKeys = Object.keys(tabConfig);
  const tabComponents = Object.values(tabConfig);
  return (
    <div id="upload-tabs">
      <Tabs variant='soft-rounded' colorScheme='green'>
        <TabList>
          {
            tabKeys.map((el) => <Tab>{el}</Tab>)
          }
        </TabList>
        <TabPanels>
          {
            tabComponents.map((component) => <TabPanel>{component}</TabPanel>)
          }
        </TabPanels>
      </Tabs>
    </div>
  );
};
