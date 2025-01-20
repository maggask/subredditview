import React, { useState, useEffect } from "react";
import RedditCard from "./RedditCard";
import RedditPost from "./RedditPost";
import { useAuth } from "../../hooks/AuthProvider";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

const RedditView = () => {
    const [posts, setPosts] = useState([]);
    const [postIsClicked, setPostIsClicked] = useState(false);
    const [singlePost, setSinglePost] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();

    useEffect(() => {
        fetch("https://www.reddit.com/r/whowouldwin/.json")
            .then((response) => response.json())
            .then((data) => {
                const posts = data.data.children.map((child) => child.data);
                setPosts(posts);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: "#7975b7" }}>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Welcome {auth.user}!
                        </Typography>
                        <Button color="inherit" onClick={() => auth.logOut()}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <h1>Subreddit - Who would win?</h1>
            {postIsClicked && (
                <RedditPost post={singlePost} onClickBack={setPostIsClicked} />
            )}
            {!postIsClicked && (
                <ul>
                    {posts.map((post) => (
                        <RedditCard
                            key={post.id}
                            post={post}
                            onClickPost={setPostIsClicked}
                            passSinglePostData={setSinglePost}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RedditView;
