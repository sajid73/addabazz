import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { UserContext } from "../../../App";
import logo from '../../../images/logo.png'

const Navbar = () => {
  const [reader,setReader] = useContext(UserContext);
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to="/"><img src={logo} alt="" width="120px" /></Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-2xl justify-center">
          <Link to="/" className="mr-5 hover:text-gray-900">Home</Link>
          <Link className="mr-5 hover:text-gray-900" to="/addblog">Publish blog</Link>
          {
            reader.logged ? <span className="mr-5 hover:text-gray-900 cursor-not-allowed">{reader.userName}</span> : <Link className="mr-5 hover:text-gray-900" to="/login">Login</Link>
          }
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
