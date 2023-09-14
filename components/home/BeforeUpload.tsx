import React, { useMemo } from "react";
import { FileUploadSection } from "./FileUploadSection";
import { FromUrl } from "./FromUrl";
import { TabComponent } from "../common/TabComponent";
import { FromYtubeUrl } from "./FromYtubeUrl";

const tabsObject = {
  "Upload File": <FileUploadSection />,
  "PDF from URL": <FromUrl />,
  // 'From Text': <FromText />,
  "Chat with Youtube video": <FromYtubeUrl />,
};
export const BeforeUpload = () => {
  return <TabComponent tabConfig={tabsObject} />;
};
