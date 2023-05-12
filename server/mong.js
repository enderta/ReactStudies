import express from "express";
import mongoose from "mongoose";
import BlogPost from "./schema.js";
import connect from "./monconn.js";

const app = express();

connect();

const insert = async (req, res) => {
    const { title, content, author } = req.body;
    const newPost = new BlogPost({
        title,
        content,
        author,
    });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

app.use(express.json());
app.post("/posts", insert);

const getPosts = async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

app.get("/posts", getPosts);

app.listen(5000, () => console.log("Server Running"));
