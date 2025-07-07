import { memo, useEffect, useRef } from 'react';
import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from '@xterm/xterm';
import { nanoid } from "nanoid";

import "@xterm/xterm/css/xterm.css";
import FontType from "../types/font";

const TerminalComponent = ({
 vmid,
 pg,
 font,
 updateStatus,
}: {
 vmid: string,
 pg: string,
 font: FontType,
 updateStatus?: () => void
}) => {
 const terminalRef = useRef(null!);
 const term = useRef<Terminal>(null!);
 const socketRef = useRef<WebSocket>(null!);
 // const origin = import.meta.env.DEV ? "localhost:3000" : location.origin.split("://")[1];
 const origin = (import.meta.env.VITE_WEBSOCKET as string).split("//")[1];

 function getWebSocketProtocol(): "ws" | "wss" {
  return window.location.protocol === "https:" ? "wss" : "ws";
 }


 useEffect(() => {
  const leftPane = document.querySelector('.left-pane') as HTMLDivElement;
  term.current = new Terminal({
   cursorBlink: true,
   fontFamily: `${font.font}, courier-new, courier, monospace`,
   theme: { background: "black", foreground: "white" }
  });

  const fitAddon = new FitAddon();
  term.current.open(terminalRef.current);
  term.current.loadAddon(fitAddon);
  fitAddon.fit();

  const wsProtocol = getWebSocketProtocol();

  let socket: WebSocket;
  let interval: NodeJS.Timeout;
  function connect() {
   const sessionid = (() => {
    const storedSession = sessionStorage.getItem("sessionid");
    if (storedSession) return storedSession;
    const newid = nanoid(10);
    sessionStorage.setItem("sessionid", newid);
    return newid;
   })();
   console.log(sessionid);
   socket = new WebSocket(`${wsProtocol}://${origin}/${pg}/${vmid}/${sessionid}`);
   socketRef.current = socket;

   interval = setInterval(() => {
    if (socket.readyState === WebSocket.OPEN) {
     socket.send(JSON.stringify({ type: 'ping' }));
    }
   }, 4000);

   socket.onopen = () => {
    const cols = term.current.cols;
    const rows = term.current.rows;
    socket.send(JSON.stringify({ type: 'resize', cols, rows }));
   }
   socket.onmessage = (event) => {
    try {
     const signal = JSON.parse(event.data);
     if (signal.type === "pong") return;
    } catch (error) { }
    term.current.write(event.data);
    updateStatus?.();
    // const cols = term.current.cols;
    // const rows = term.current.rows;
    // socket.send(JSON.stringify({ type: 'resize', cols, rows }));
   };

   term.current.onData((data) => {
    socket.send(data);
    updateStatus?.();
   });
   term.current.onScroll(() => {
    updateStatus?.();
   })

   socket.onerror = () => {
    // console.error("WebSocket error:", err);
   };
   socket.onclose = () => {
    // console.warn("WebSocket closed:", event);
   };
  }

  connect();

  const resizeHandler = () => {
   fitAddon.fit();
   const cols = term.current.cols;
   const rows = term.current.rows;
   if (socket.OPEN) {
    socket.send(JSON.stringify({ type: 'resize', cols, rows }));
   }
  }

  const resizeObserver = new ResizeObserver(resizeHandler);

  window.addEventListener("resize", resizeHandler);
  resizeObserver.observe(leftPane);

  return () => {
   clearInterval(interval);
   socket.close();
   term.current.dispose();
   window.removeEventListener("resize", resizeHandler);
   resizeObserver.unobserve(leftPane);
  };
 }, []);

 useEffect(() => {
  if (term.current) {
   term.current.options.fontFamily = `${font.font}, courier-new, courier, monospace`;
  }
 }, [font]);

 return <div className="terminal-container" id={vmid} ref={terminalRef} style={{ width: '100%', height: '100%' }} />;
};

export default memo(TerminalComponent);
