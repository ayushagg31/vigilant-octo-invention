import React, { useMemo } from "react";
import { FileUploadSection } from "./FileUploadSection";
import { FromUrl } from "./FromUrl";
import { TabComponent } from "../common/TabComponent";
import { FromYtubeUrl } from "./FromYtubeUrl";

const tabsObject = {
  "Upload File": <FileUploadSection />,
  "From Url": <FromUrl />,
  // 'From Text': <FromText />,
  "From Youtube": <FromYtubeUrl />,
};
export const BeforeUpload = () => {
  return <TabComponent tabConfig={tabsObject} />;
};
