import { useParams } from "react-router-dom";
import TerminalComponent from "../components/terminal"
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
 return (
  <section className="w-full h-full m-0 p-2 absolute bg-black">
   <div className="left-pane">
    <div></div>
   </div>
   <TerminalComponent
    updateStatus={() => null}
    vmid={vm!}
    pg={id!}
    font={{ font: "Hack Nerdfont", name: "Hack" }}
   />
  </section>
 );
}