import express from "express";
import mongoose from "mongoose";
import BlogPost from "./schema.js";
import connect from "./monconn.js";

const app = express();
app.use(express.json());
connect();
const insert = async (req, res) => {
    const { title, content, author } = req.body;
    const newPost = new BlogPost({
        _id: new mongoose.Types.ObjectId(),
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

const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await BlogPost.findById(id);
        res.status(200).json(post);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

app.get("/posts/:id", getPost);

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;
    try {
        const post = await BlogPost.findById(id);
        if (title) post.title = title;
        if (content) post.content = content;
        if (author) post.author = author;
        await post.save();
        res.status(200).json(post);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

app.put("/posts/:id", updatePost);

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await BlogPost.findByIdAndRemove(id);
        res.status(200).json({ message: "Post deleted successfully." });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

app.delete("/posts/:id", deletePost);






app.listen(5000, () => console.log("Server Running"));