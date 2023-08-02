import React from "react";
import Fame from "./Fame";
import Example from "./Example";
import TabsSection from "./TabsSection";

const Home = () => {
  return (
    <div className="my-4">
      <Fame />
      <div className="my-3">
        <div className="columns">
          <div className="column is-one-third">
            {/* Left section of the dashboard page */}
            <Example />
          </div>
          <div className="column">
            <TabsSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
