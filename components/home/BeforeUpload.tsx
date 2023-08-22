import React from "react";
import Example from "./Example";
import TabsSection from "./TabsSection";
import { FileUploadSection } from "./FileUploadSection";
import { FromUrl } from "./FromUrl";
import { FromText } from "./FromText";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { TabComponent } from "../common/TabComponent";
import { FromYtubeUrl } from "./FromYtubeUrl";


export const BeforeUpload = () => {
  const tabConfig = {
    'Upload File': <FileUploadSection />,
    'From Url': <FromUrl />,
    // 'From Text': <FromText />,
    'From Youtube': <FromYtubeUrl />
  };

  return (
    <div id="upload-tabs">
      <TabComponent tabConfig={tabConfig} />
    </div>
  );
};
