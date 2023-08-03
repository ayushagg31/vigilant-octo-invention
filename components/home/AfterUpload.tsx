import React, { useState } from "react";
import { useDashboard } from "../../store/useDashboard";
import Chat from "./Chat";

export const AfterUpload = () => {
  const { result, activeResultTab, setAcitveResultTab } = useDashboard(
    (store) => {
      return {
        result: store.result,
        activeResultTab: store.activeResultTab,
        setAcitveResultTab: store.setAcitveResultTab,
      };
    }
  );

  const tabTitleMap = {
    fullText: "Actual document",
    summary: "Summary",
  };

  const { fullText, summary, conciseSummary } = result;
  return (
    <div className="columns" style={{ height: "100%" }}>
      <div className="column">
        <div className="tabs">
          <ul>
            {Object.keys(result).map((key) => {
              return (
                <li
                  className={`${activeResultTab === key ? "is-active" : ""}`}
                  onClick={() => setAcitveResultTab(key)}
                >
                  <a>{tabTitleMap[key]}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          {activeResultTab === "fullText" ? (
            <object
              data={result.url ? result.url : 'http://africau.edu/images/default/sample.pdf'}
              type="application/pdf"
              width="100%"
              height="100%"
            >
            </object>
          ) : (
            result[activeResultTab]
          )}
        </div>
      </div>
      <div className="column box is-one-third">
        <Chat />
      </div>
    </div>
  );
};
