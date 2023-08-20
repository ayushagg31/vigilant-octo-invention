import React from "react";
import Fame from "./Fame";
import { useDashboard } from "../../store/useDashboard";
import { BeforeUpload } from "./BeforeUpload";
import { AfterUpload } from "./AfterUpload";

const Home = () => {
  const { showResult } = useDashboard((store) => {
    return {
      showResult: store.showResult,
    };
  });

  return (
    <div className="my-4">
      {/* {!showResult && <Fame />} */}
      <div className="m-3 mt-5" style={{ height: "70vh" }}>
        {showResult ? <AfterUpload /> : <BeforeUpload />}
      </div>
    </div>
  );
};

export default Home;
