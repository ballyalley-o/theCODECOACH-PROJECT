import { Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";


function BackButton({url}) {
  return (
    <Link to={url} className="btn btn-reverse backButton">
      <TiArrowBack className="icon" /> Back
    </Link>
  );
}

export default BackButton