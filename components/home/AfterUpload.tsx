import React, { useState } from "react";
import { useDashboard } from "../../store/useDashboard";
import Chat from "./Chat";
import RenderResult from "next/dist/server/render-result";

export const AfterUpload = () => {
  const { result, activeResultTab, setAcitveResultTab, apiFailure } =
    useDashboard((store) => {
      return {
        result: store.result,
        activeResultTab: store.activeResultTab,
        setAcitveResultTab: store.setAcitveResultTab,
        apiFailure: store.apiFailure,
      };
    });

  const tabTitleMap = {
    fullText: "Actual document",
    summary: "Summary",
  };

  const { collectionName } = result;

  const renderPdf = () => {
    if (apiFailure) return "Error...";
    return (
      <>
        <object
          data={`http://localhost:3000/pdfs/${collectionName}.pdf`}
          type="application/pdf"
          width="100%"
          height="100%"
        ></object>
      </>
    );
  };

  const renderResult = () => {
    return null;
  };

  const handleFetch = () => {
    // fetch current tab
    console.log("fetch current tab " + activeResultTab);
  };

  return (
    <div className="columns" style={{ height: "100%" }}>
      <div className="column">
        <div className="tabs">
          <ul>
            {Object.keys(tabTitleMap).map((key) => {
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
        <div className="h-full">
          {/* PDF tab */}
          <div className="h-full" hidden={activeResultTab !== "fullText"}>
            {renderPdf()}
          </div>
          {/* Other tabs */}
          <div className="h-full" hidden={activeResultTab === "fullText"}>
            {result[activeResultTab] ? (
              renderResult()
            ) : (
              <button className="button is-small is-link" onClick={handleFetch}>
                Get detailed summary of the doc
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="column is-two-fifths">
        <h1 className="is-size-4 is-italic is-uppercase">Chat with you doc!</h1>
        <div className="box h-full">
          <Chat />
        </div>
      </div>
    </div>
  );
};
