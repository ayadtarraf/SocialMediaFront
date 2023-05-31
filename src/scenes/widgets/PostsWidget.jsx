import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, removePost } from "state"; // Assuming you have a removePost action

import PostWidget from "./PostWidget";
import { useParams, useLocation } from "react-router-dom";

const PostsWidget = ({ userId, isProfile = false }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  // console.log(searchQuery);

  const getPosts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ENV}/posts${isProfile?`/user?id=${userId}`:"?"}${searchQuery?"search="+searchQuery:""}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENV}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    console.log("data post widget",data);
  };
  

  useEffect(() => {
      getPosts();
    
  }, [searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeletePost = (postId) => {
    dispatch(removePost(postId));
  };

  return (
    <>
      {Array.isArray(posts) &&
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            occupation,
            picturePath,
            userPicturePath,
            likes,
            comments,
            searchPosts,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              occupation={occupation}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
              searchPosts={searchPosts}
              onDeletePost={handleDeletePost}
            />
          )
        )}
    </>
  );
};

export default PostsWidget;
