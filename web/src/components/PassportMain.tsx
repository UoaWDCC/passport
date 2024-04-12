import Logo from "../assets/WDCC_Logo.svg";
import "../styles/page styles/Passport.css";

export default function PassportMain({}) {
  return (
    <div className={`passport passport-main m-auto rounded-br-3xl flex justify-center items-center `}>
      {/* <h1>This is the passport main page</h1> */}
      <img src={Logo} alt="" className="h-80" />
    </div>
  );
}
