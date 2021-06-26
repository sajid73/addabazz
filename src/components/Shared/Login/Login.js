import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import swal from "sweetalert";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../../App";

const Login = () => {
  const [reader,setReader] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [newuser, setnewuser] = useState(false);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const handleLogin = (e) => {
    if (newuser) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          e.target.email.value,
          e.target.password.value
        )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          userNameUpdate(e.target.username.value)
          swal("Sign up successful!", "Now log in to continue", "success");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          swal("Try again!", `${errorMessage}`, "error");
        });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(e.target.email.value, e.target.password.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const newUser = {...reader};
          newUser.logged = true;
          newUser.userName = user.displayName;
          newUser.email = user.email;
          isAdmin(newUser);
          swal("Login successful!", "Now continue to read", "success");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          swal("password / email worng!", `${errorMessage}`, "error");
        });
    }

    e.preventDefault();
  };

  const isAdmin = (newUser) => {
    fetch("https://immense-lowlands-77074.herokuapp.com/admins", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: newUser.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        newUser.isAdmin = data;
        setReader(newUser)
        history.replace(from);
      });
  }

  const userNameUpdate = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  }
  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 pb-48 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Login
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Login to see your profile and blogs
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form onSubmit={handleLogin} className="flex flex-wrap -m-2">
          {
            newuser && <div className="p-2 w-1/2">
            <div className="relative">
              <label for="name" className="leading-7 text-sm text-gray-600">
                username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                placeholder="Enter your username"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          }
            <div className="p-2 w-1/2">
              <div className="relative">
                <label for="email" className="leading-7 text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <label for="password" className="leading-7 text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="type your password"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="p-2 w-full">
              <input type="checkbox" name="newuser" id="newuser" label="New user?" onChange={() => setnewuser(!newuser)} />
              <label for="newuser" className="px-1"> New user</label>
            </div>
            <div className="p-2 w-full">
              <input
                type="submit"
                value="Sign up"
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
