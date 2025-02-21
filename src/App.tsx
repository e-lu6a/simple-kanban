import { useEffect, useRef } from "react";

function App() {
  return (
    <>
      <div
        style={{
          border: "1px green solid",
          height: "calc(100vh - 50px)",
          width: "calc(100% - 50px)",
          margin: "24px",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          boxSizing: "border-box",
          paddingLeft: "80px",
          paddingTop: "150px",
        }}
      >
        <Board />
        <Board />
      </div>
    </>
  );
}

export default App;

function Board() {
  return (
    <div
      style={{
        minWidth: "350px",
        height: "fit-content",
        border: "1px pink solid",
        padding: "30px",
      }}
    >
      <div style={{ textAlign: "center" }}>title</div>
      <hr />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
}

function Item() {
  function handleChange(e) {
    e.target.style.height = "auto";
    const contentHeight = e.target.scrollHeight;
    e.target.style.height = `${contentHeight}px`;
  }

  return (
    <>
      <div
        style={{
          margin: "10px 0px",
          backgroundColor: "snow",
          // border: "1px pink solid",
          borderRadius: "8px",
          padding: "7px 10px 0px 10px",
        }}
      >
        <textarea
          rows={1}
          style={{
            boxSizing: "border-box",
            fontFamily: "inherit",
            lineHeight: "1em",
            minHeight: "1.5em",
            width: "100%",
            resize: "none",
            outline: "none",
            overflowY: "hidden", // gets rid of the sometimes extra row, similar https://github.com/Semantic-Org/Semantic-UI-React/issues/2173#issuecomment-336794270

            backgroundColor: "transparent",
            border: "none",
          }}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
