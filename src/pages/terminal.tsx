import { useParams } from "react-router-dom";
import TerminalComponent from "../components/terminal"
import Window from "../types/global"
import { useEffect } from "react";

export default function PopupTerminal() {
 const { vm, id } = useParams();
 useEffect(() => {
  const button = document.getElementById("dark-white-mode-button") as HTMLDivElement;
  button.style.display = "none";
  return () => {
   button.style.display = "block";
  }
 }, []);

 useEffect(() => {
  const resetTimer = (window as unknown as Window).suku;
  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeydown = resetTimer;
  document.onscroll = resetTimer;
  document.onclick = resetTimer;
  document.ontouchstart = resetTimer;

  return () => {
   window.onload = null;
   document.onmousemove = null;
   document.onkeydown = null;
   document.onscroll = null;
   document.onclick = null;
   document.ontouchstart = null;
  }
 }, []);

 return (
  <section className="w-full h-full m-0 p-2 absolute bg-black">
   <div className="left-pane">
    <div></div>
   </div>
   <TerminalComponent
    updateStatus={(window as unknown as Window).suku}
    vmid={vm!}
    pg={id!}
    font={{ font: localStorage.getItem("font") ?? "Hack Nerdfont", name: "Hack" }}
   />
  </section>
 );
}