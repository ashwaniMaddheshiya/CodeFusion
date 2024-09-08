"use client";
import React, { useState, useEffect, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";
import { io } from "socket.io-client";

// Initialize Socket.io client
const socket = io("http://localhost:5000");
const roomId = 12345;

const CodeMirrorEditor = () => {
  const [code, setCode] = useState("console.log('Hello World');");
  const [cursor, setCursor] = useState({ line: 0, ch: 0 });
  const editorRef = useRef(null);

  useEffect(() => {
    // Log when connected to the server
    console.log(socket);
    
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id);
      socket.emit("join-room", roomId);
    });

    // Clean up on unmount
    // return () => {
    //   socket.off("connection"); // Remove listener
    //   socket.disconnect(); // Properly disconnect the socket
    // };
  }, []);

  const handleCodeChange = (value) => {
    // setCode(value);
    // socket.emit("codeChange", { roomId, code: value });
  };

  const handleCursorChange = (editor) => {
    // const cursorPos = editor.getCursor();
    // setCursor(cursorPos);
    // socket.emit("cursorUpdate", { roomId, cursor: cursorPos });
  };

  return (
    <div className="p-2 w-full">
      <CodeMirror
        value={code}
        height="80vh"
        theme={tokyoNightStorm}
        extensions={[javascript({ jsx: true })]}
        onChange={handleCodeChange}
        onCursorActivity={handleCursorChange}
        ref={editorRef}
      />
    </div>
  );
};

export default CodeMirrorEditor;
