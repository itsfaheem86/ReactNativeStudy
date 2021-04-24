import React from "react";
import { useState } from "react";

const BlogContext = React.createContext();

export const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPost] = useState([]);

  const addBlogPost = (post) => {
    setBlogPost([...blogPosts, post]);
  };

  return (
    <BlogContext.Provider value={{ blogPosts, addBlogPost }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
