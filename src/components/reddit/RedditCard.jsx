import React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import { Box, styled } from "@mui/system";
import ReactMarkdown from "react-markdown";

const CardStyled = styled(Card)({
    margin: "20px",
    padding: "20px",
    backgroundColor: "#f5f5f5",
});

const RedditCard = ({ post, onClickPost, passSinglePostData }) => {
    const handlePostClick = () => {
        onClickPost(true);
        passSinglePostData(post);
    };

    return (
        <CardActionArea onClick={() => handlePostClick()}>
            <CardStyled variant="outlined">
                <CardContent>
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
                    <Typography
                        sx={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3,
                        }}
                        variant="body1"
                        component="div"
                        align="left"
                    >
                        <ReactMarkdown>{post.selftext}</ReactMarkdown>
                    </Typography>
                    <Box
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "10px",
                        }}
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
                </CardContent>
            </CardStyled>
        </CardActionArea>
    );
};

export default RedditCard;
