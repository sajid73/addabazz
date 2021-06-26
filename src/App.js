import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from "./components/Home/Navbar/Navbar";
import Home from "./components/Home/Home/Home";
import PrivateRoute from "./components/Shared/PrivateRoute/PrivateRoute"
import CreateBlog from "./components/Home/CreateBlog/CreateBlog";
import Blog from "./components/Home/Blog/Blog";
import Login from "./components/Shared/Login/Login";
import Footer from "./components/Footer/Footer";
import { createContext,useState } from "react";

export const UserContext = createContext();

function App() {
  const [reader, setReader] = useState({
    logged: false,
    userName: "",
    email: "",
    isAdmin: false
  })
  return (
    <UserContext.Provider value={[reader, setReader]}>
      <div id="scroll_bar" className="app">
      <div className="body">
      <Router>
      <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/addblog">
            <CreateBlog />
          </PrivateRoute>
          <PrivateRoute path="/blog/:blogid">
            <Blog />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
      </div>
      <Footer />
    </div>
    </UserContext.Provider>
  );
}

export default App;
