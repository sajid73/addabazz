import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../../App";

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [reader,setReader] = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    fetch('https://immense-lowlands-77074.herokuapp.com/blogs')
    .then(res => res.json())
    .then(data => setBlogs(data))
  }, [])

  const deleteBlog = (id) => {
    fetch(`https://immense-lowlands-77074.herokuapp.com/removeblog/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

  const singleBlog = (blogid) => {
    history.push(`/blog/${blogid}`)
  }

  return (
    <section className="flex flex-wrap -m-4">
      {
        blogs.map(blog=> 
          <div class="lg:w-1/3 sm:w-1/2 p-4">
        <div class="flex relative cursor-pointer" onClick={() => singleBlog(blog._id)}>
          <img alt="gallery" class="absolute inset-0 w-full h-full object-cover object-center" src={blog.image} />
          <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
            <h2 class="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">{blog.title}</h2>
            <h1 class="title-font text-lg font-medium text-gray-900 mb-3">{blog.author}</h1>
            <p class="leading-relaxed overflow-hidden">{blog.blog.slice(0,20)} ...</p>
          </div>
        </div>
        {
          reader.isAdmin && <button onClick={() => deleteBlog(blog._id)} className="mx-2 my-1 p-2 rounded-md bg-red-700">delete</button>
        }
      </div>
        )
      }
    </section>
  );
};

export default Blogs;