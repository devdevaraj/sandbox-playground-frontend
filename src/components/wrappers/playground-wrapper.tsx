import { Outlet } from "react-router-dom";
import Playground from "../../pages/playground";

export default function PlaygroundWrapper() {
 return (
  <>
   <Playground>
    <Outlet />
   </Playground>
  </>
 );
}