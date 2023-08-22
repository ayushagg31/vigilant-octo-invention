import React, { useState } from "react";
import { FileUploadSection } from "./FileUploadSection";
import { FromUrl } from "./FromUrl";
import { FromText } from "./FromText";
import { tabItems } from "../../constants/dashboard.constants";
import { useDashboard } from "../../store/useDashboard";
import { FromYtubeUrl } from "./FromYtubeUrl";

const TabsSection = () => {
  const { currentTab, setCurrentTab } = useDashboard((store) => {
    return {
      currentTab: store.currentTab,
      setCurrentTab: store.setCurrentTab,
    };
  });

  const renderTab = () => {
    switch (currentTab) {
      case "upload_file":
        return <FileUploadSection />;
      case "from_url":
        return <FromUrl />;
        case "from_youtube":
          return <FromYtubeUrl />;
      case "enter_text":
        return <FromText />;
      default:
        break;
    }
  };

  return (
    <>
      <div className="tabs is-left">
        <ul>
          {tabItems.map((tabItem) => {
            return (
              <li
                className={`${currentTab === tabItem.id ? "is-active" : ""}`}
                onClick={() => setCurrentTab(tabItem.id)}
              >
                <a>{tabItem.label}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <div>{renderTab()}</div>
    </>
  );
};

export default TabsSection;
