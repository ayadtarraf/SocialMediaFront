import React, { useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  Send,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Input, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  occupation,
  picturePath,
  userPicturePath,
  likes,
  comments,
  searchPosts,
  onDeletePost,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [Comment, setComment] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    // console.log("Updated Post:", updatedPost);
    dispatch(setPost({ post: updatedPost }));

    // Call the searchPosts function passed as prop
    if (searchPosts) {
      searchPosts(""); // You can provide a search query here if needed
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // console.log("Deleted Post:", data);

    // Call the onDeletePost function passed as prop
    if (onDeletePost) {
      onDeletePost(postId);
    }
  };

  const postComment = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/commentPost`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: Comment}),

    });
  }
  const updatedPost = await response.json();
  dispatch(setPost({ post: updatedPost }));
  setComment("")
}:
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={occupation}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="0.3rem">
          <IconButton onClick={patchLike}>
            {isLiked ? (
              <FavoriteOutlined sx={{ color: primary }} />
            ) : (
              <FavoriteBorderOutlined />
            )}
          </IconButton>
          <Typography>{likeCount}</Typography>
        </FlexBetween>

        <FlexBetween gap="0.3rem">
          <IconButton onClick={() => setIsComments(!isComments)}>
            <ChatBubbleOutlineOutlined />
          </IconButton>
          <Typography>{comments && comments.length}</Typography>
          <Input
          value={Comment}
          onChange={(e) => setComment(e.target.value)}
          />
          {Comment.length > 0 ? (
            <Send
            style={{marginTop: "10px"}}
            fullWidth
            disabled={!Comment.length}
            color="primary"
            variant="contained"
            onClick={postComment}
            >
              Comment
            </Send>
          ) :(
            ""
          )}
        </FlexBetween>

        {loggedInUserId === postUserId && (
          <IconButton onClick={handleDelete}>
            <DeleteOutlineOutlined />
          </IconButton>
        )}

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
