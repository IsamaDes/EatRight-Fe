import { Link } from "react-router-dom";


const Header = () => {
  return (
  
         <div>
        <nav className="bg-purple-600 text-white p-4 mb-5 flex gap-4">
        <Link to="/client/profile">Profile</Link>
        <Link to="/settings">Settings</Link>
      </nav>

</div>
   
  )
}

export default Header

 
