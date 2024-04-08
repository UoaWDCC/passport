import { Link } from "react-router-dom";

function Submit() {
  return (
    <div className="submit">
        <Link to='/dashboard'>
            <button type="submit">Finish!</button>
        </Link>
    </div>
  );
}
export default Submit;