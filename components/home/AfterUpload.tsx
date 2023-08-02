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
    fullText: "Full text",
    summary: "Detailed notes",
    conciseSummary: "Short summary",
  };

  const { fullText, summary, conciseSummary } = result;
  return (
    <div className="columns" style={{ height: '100%'}}>
      <div className="column">
        <div className="tabs">
          <ul>
            {Object.keys(result).map((key) => {
              return (
                <li className={`${activeResultTab === key  ? 'is-active': ''}`} onClick={() => setAcitveResultTab(key)}>
                  <a>{tabTitleMap[key]}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          {result[activeResultTab]}
        </div>
      </div>
      <div className="column box is-one-third">
        <Chat />
      </div>
    </div>
  );
};
