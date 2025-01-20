import React from "react";
import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";

const FormStyled = styled("form")({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    "& .form_control": {
        display: "flex",
        color: "#000",
        gap: "10px",
    },
    "& .btn-submit": {
        backgroundColor: "#f5f5f5",
        color: "#000",
        padding: "10px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    "& input": {
        padding: "5px",
        borderRadius: "5px",
        border: "1px solid #000",
        backgroundColor: "#fff",
        color: "#000",
    },
});

const Login = () => {
    const [input, setInput] = useState({
        username: "",
        password: "",
    });
    const auth = useAuth();

    const handleSubmitEvent = (e) => {
        e.preventDefault();

        if (input.username !== "" && input.password !== "") {
            auth.loginAction(input);
            return;
        }

        alert("please provide a valid input");
    };

    const handleInput = (e) => {
        const { name, value } = e.target;

        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Box
            component="section"
            sx={{
                padding: 2,
                borderRadius: 2,
                backgroundColor: "#eb6dc4",
            }}
        >
            <FormStyled onSubmit={handleSubmitEvent}>
                <div className="form_control">
                    <label htmlFor="user-name">Username:</label>
                    <input
                        type="username"
                        id="user-name"
                        name="username"
                        placeholder="username"
                        onChange={handleInput}
                    />
                </div>
                <div className="form_control">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleInput}
                    />
                </div>
                <Button className="btn-submit" type="submit" size="small">
                    Login
                </Button>
            </FormStyled>
        </Box>
    );
};

export default Login;
