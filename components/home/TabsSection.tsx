import React, { useState } from "react";
import { FileUploadSection } from "./FileUploadSection";
import { FromUrl } from "./FromUrl";
import { FromText } from "./FromText";

const tabItems = [
  {
    id: "upload_file",
    label: "Upload a file",
  },
  {
    id: "from_url",
    label: "From URL",
  },
  {
    id: "enter_text",
    label: "Enter text",
  },
];

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState(tabItems[0].id);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  const renderTab = () => {
    switch (activeTab) {
      case "upload_file":
        return <FileUploadSection />;
      case "from_url":
        return <FromUrl />;
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
                className={`${activeTab === tabItem.id ? "is-active" : ""}`}
                onClick={() => handleTabClick(tabItem.id)}
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
