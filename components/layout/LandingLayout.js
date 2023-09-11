import SimpleNavbar from "../landingComponents/LandingNavBar";

("use client");

export default function LandingLayout({ children }) {
  return (
    <>
      <div className="is-flex is-fullwidth">
        <div>{children}</div>
      </div>
    </>
  );
}


//import { AiOutlineClose as CloseIcon, AiOutlineMenu as HamburgerIcon } from "react-icons/ai"