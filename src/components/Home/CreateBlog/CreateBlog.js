import React, { useContext, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";
import swal from "sweetalert";
import { Route, Redirect } from "react-router";
import { UserContext } from "../../../App";


const CreateBlog = () => {
  const [imgavl, setImgavl] = useState(false);
  const [imgurl, setimgurl] = useState(null);
  const [blogUploaded, setBlogUploaded] = useState(false);
  const [reader,setReader] = useContext(UserContext);

  const time = new Date();
  const date = time.getDate()
  const month = time.toLocaleString('default', { month: 'long' })
  const year = time.getFullYear()
  
  const fileUpload = (e) => {
    const imginfo = new FormData();
    imginfo.set("key", "ac20e1a136467136bdc171029a510ed8");
    imginfo.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imginfo)
      .then((res) => {
        setimgurl(res.data.data.url);
        setImgavl(true);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = (e) => {
    fetch("https://immense-lowlands-77074.herokuapp.com/addblog", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: e.target.title.value,
        blog: e.target.blog.value,
        image: imgurl,
        date: date,
        month: month,
        year: year,
        author: reader.userName
      }),
    })
      .then((resonse) => resonse.json())
      .then((data) => setBlogUploaded(true))
      swal("Good job!", "You clicked the button!", "success");
      window.location.href = '/';
    e.preventDefault();
  };
  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="mx-auto">
          <Player
            autoplay
            loop
            src="https://assets8.lottiefiles.com/packages/lf20_PdzoiE.json"
            style={{ height: "400px", width: "400px" }}
          ></Player>
        </div>
        {
          reader.isAdmin ? <form
          onSubmit={handleSubmit}
          className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mx-auto md:mt-0 p-3 rounded-lg"
        >
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Blog
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            Share your thought & knowledge
          </p>
          <div className="relative mb-4">
            <label for="name" className="leading-7 text-2xl text-gray-600">
              Title
            </label>
            <input
              required
              type="text"
              id="title"
              name="title"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label for="cover" className="leading-7 text-sm text-gray-600">
              Cover image
            </label>
            <input
              required
              onChange={fileUpload}
              type="file"
              id="cover"
              name="cover"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label for="blog" className="leading-7 text-sm text-gray-600">
              Blog
            </label>
            <textarea
              required
              id="blog"
              name="blog"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          {imgavl ? (
            <input
              type="submit"
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              value="Publish blog"
            />
          ) : (
            <p>Image uploading</p>
          )}
        </form> : <p className="text-3xl font-bold p-5">You don't have permission to post a blog <br /> Only admin can publish</p>
        }
      </div>
    </section>
  );
};

export default CreateBlog;
