import React from "react";
import Example from "./Example";
import TabsSection from "./TabsSection";

export const BeforeUpload = () => {
  return (
    <div className="columns">
      <div className="column is-one-third">
        {/* Left section of the dashboard page */}
        <Example />
      </div>
      <div className="column">
        <TabsSection />
      </div>
    </div>
  );
};
