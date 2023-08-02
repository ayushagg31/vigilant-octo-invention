import React from "react";

const Chat = () => {
  const chat = ["Hello how are you?", "I am good"];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {chat.map((m, i) => {
          const msgClass = i === 0 || i % 2 === 0; // for demo purposes, format every other msg
          return (
            <p
              style={{
                padding: ".25em",
                textAlign: msgClass ? "left" : "right",
                overflowWrap: "break-word"
              }}
            >
              <span
                key={i}
                className={`tag is-medium ${
                  msgClass ? "is-success" : "is-info"
                }`}
              >
                {m}
              </span>
            </p>
          );
        })}
      </div>

      <div>
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input"
              name="userInput"
              type="text"
              placeholder="Type your message"
            />
          </div>
          <div className="control">
            <button className="button is-info">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
