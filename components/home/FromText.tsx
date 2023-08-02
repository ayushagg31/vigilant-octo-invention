import React from "react";

export const FromText = () => {
  const handleTextSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements.rawText.value);
  };

  return (
    <>
      <form onSubmit={handleTextSubmit}>
        <textarea
          className="textarea"
          placeholder="Enter your text"
          name="rawText"
          rows={10}
        ></textarea>
        <div className="buttons is-right">
          <button className="button is-link mt-4" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
