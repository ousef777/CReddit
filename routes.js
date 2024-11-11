const express = require("express");
const router = express.Router();

const posts = require("./posts");

router.get('/posts', (req, res) => {
    if (req.query.title) res.json(posts.filter(post => post.title.includes(req.query.title)));
    else res.status(200).json(posts);
});

router.get('/posts/:id', (req, res) => {
    const post = posts.find(el => el.id === +req.params.id)
    if (!post) res.status(404).send("Not Found");
    else res.status(200).json(post);
});

router.post('/posts', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    if (!title) res.status(400).send("Missing title");
    else if (!description) res.status(400).send("Missing description");
    else if (typeof title !== "string") res.status(400).send("title incorrect type");
    else if (typeof description !== "string") res.status(400).send("description incorrect type");
    else {
        const post = {
            id: 0,
            ...req.body,
            posts: []
        };
        posts.unshift(post);
        res.status(200).json(post);
    }
});

router.delete('/posts/:id', (req, res) => {
    const post = posts.findIndex(el => el.id === +req.params.id)
    if (!post) res.status(404).send("Not Found");
    else {
        posts.splice(post, 1);
        res.status(200).json({ message: "Post has been deleted successfully" });
    }
});

//Add comment
router.post('/posts/:id/comments', (req, res) => {
    const post = posts.find(el => el.id === +req.params.id)
    if (!post) res.status(404).send("Not Found");
    const user = req.body.user;
    const comment = req.body.comment;
    if (!user) res.status(400).send("Missing user");
    else if (!comment) res.status(400).send("Missing comment");
    else if (typeof user !== "string") res.status(400).send("user incorrect type");
    else if (typeof comment !== "string") res.status(400).send("comment incorrect type");
    else {
        post.comments.push({
            id: (post.comments.at(-1).id + 1),
            ...req.body,
        });
        res.status(200).json(req.body);
    }
});

//delete comment by id
router.delete('/posts/comments/:id', (req, res) => {
    const post = posts.find(post => post.comments.find(comment => comment.id === +req.params.id))
    if (!post) res.status(404).send("Not Found");
    else {
        post.comments.splice(post.comments.findIndex(comment => comment.id === +req.params.id), 1);
        res.status(200).json({ message: "Comment has been deleted successfully" });
    }
});

module.exports = router;