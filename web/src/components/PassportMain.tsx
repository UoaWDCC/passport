import Logo from "../images/secondary_white_1024.png";
import "../styles/Passport.css";

export default function PassportMain() {
  return (
    <div className="passport passport-main m-auto rounded-br-3xl flex justify-center items-center">
      {/* <h1>This is the passport main page</h1> */}
      <img src={Logo} alt="" className="h-80" />
    </div>
  );
}
