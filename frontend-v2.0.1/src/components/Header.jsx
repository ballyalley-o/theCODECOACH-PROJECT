import { FaSignInAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <Header className="">
        <div className="">
            <Link to="/">The Code Coach Project</Link>
        </div>
    </Header>
  )
}

export default Header