import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const RedditComments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(
                    `https://www.reddit.com/comments/${postId}.json`
                );
                setComments(
                    response.data[1].data.children.map((child) => child.data)
                );
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading comments</div>;

    return (
        <div>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {comments.map((comment) => (
                    <>
                        <Box
                            key={comment.id}
                            component="section"
                            sx={{
                                margin: "10px 0",
                                boxShadow: 3,
                                padding: 2,
                                borderRadius: 2,
                            }}
                        >
                            <li key={comment.id}>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    align="left"
                                >
                                    <small>By {comment.author}</small>
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    align="left"
                                    component="p"
                                >
                                    {comment.body}
                                </Typography>
                            </li>
                        </Box>
                        {/* Display one level of replies to a comment if there are any replies */}
                        {comment.replies &&
                            comment.replies.data.children.length > 0 &&
                            comment.replies.data.children
                                .filter((reply) => reply.kind !== "more")
                                .map((reply) => (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Box
                                            key={reply.id}
                                            component="section"
                                            sx={{
                                                margin: "10px 0 0 30px",
                                                boxShadow: 3,
                                                padding: 2,
                                                borderRadius: 2,
                                            }}
                                        >
                                            <li key={comment.id}>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                    align="left"
                                                >
                                                    <small>
                                                        By {reply.data.author}
                                                    </small>
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                    align="left"
                                                    component="p"
                                                >
                                                    {reply.data.body}
                                                </Typography>
                                            </li>
                                        </Box>
                                    </Box>
                                ))}
                    </>
                ))}
            </ul>
        </div>
    );
};

export default RedditComments;
