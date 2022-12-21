import { Link } from 'react-router-dom';
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";


function Home() {
  return (
    <>
      <section className="heading">
        <h1>YOUR WAY OF LEARNING</h1>
        <p></p>
      </section>

      <Link to="/register" className="btn btn-reverse btn-block">
        <MdOutlineFeaturedPlayList /> REGISTER
      </Link>
      <Link to="/login" className="btn btn-block">
        <IoLogInOutline /> LOG-IN
      </Link>
    </>
  );
}

export default Home;
