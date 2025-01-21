import React from "react";
import RedditComments from "./RedditComments";
import { Card, Typography, IconButton } from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import { Box, styled } from "@mui/system";
import { ArrowBack } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";

const CardStyled = styled(Card)({
    margin: "20px",
    padding: "20px",
    backgroundColor: "#f5f5f5",
});

const RedditPost = ({ post, onClickBack }) => {
    return (
        <>
            <CardStyled className="reddit-post">
                <IconButton
                    aria-label="back"
                    style={{ display: "flex" }}
                    onClick={() => onClickBack(false)}
                >
                    <ArrowBack />
                </IconButton>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    align="left"
                >
                    Posted by {post.author}
                </Typography>
                <Typography variant="h5" component="h2" align="left">
                    {post.title}
                </Typography>
                <Typography variant="body1" component="div" align="left">
                    <ReactMarkdown>{post.selftext}</ReactMarkdown>
                </Typography>
                <Box
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                >
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        align="left"
                        style={{ display: "flex" }}
                    >
                        <SwapVertOutlinedIcon />
                        {post.ups}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        align="left"
                        style={{ display: "flex" }}
                    >
                        <ChatBubbleOutlineOutlinedIcon />
                        {post.num_comments}
                    </Typography>
                </Box>
            </CardStyled>
            <CardStyled>
                <Typography variant="h6" component="h3" align="left">
                    Comments {post.num_comments}
                </Typography>
                <RedditComments key={post.id} postId={post.id} />
            </CardStyled>
        </>
    );
};

export default RedditPost;
