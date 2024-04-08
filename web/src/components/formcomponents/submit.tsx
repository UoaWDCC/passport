import { Link } from "react-router-dom";

function Submit() {
  return (
    <Link to='/dashboard'>
    <button className="submit" type="submit">
      Finish!
    </button>
    </Link>
  );
}
export default Submit;