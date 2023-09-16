import React, { useMemo } from "react";
import { FileUploadSection } from "./FileUploadSection";
import { FromUrl } from "./FromUrl";
import { TabComponent } from "../common/TabComponent";
import { FromYtubeUrl } from "./FromYtubeUrl";
import {
  BsYoutube,
  BsChatFill,
  BsArrowRight,
  BsUpload,
  BsLink,
} from "react-icons/bs";

const tabsObject = [
  {
    component: <FileUploadSection />,
    title: (
      <>
        <BsUpload /> Upload PDF
      </>
    ),
  },
  {
    component: <FromUrl />,
    title: (
      <>
        <BsLink /> PDF URL
      </>
    ),
  },
  {
    component: <FromYtubeUrl />,
    title: (
      <>
        <BsYoutube /> YouTube URL
      </>
    ),
  },
];

export const BeforeUpload = () => {
  return <TabComponent tabConfig={tabsObject} />;
};
