const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    const pageSize = +req.query.pagesize
    const currentPage = +req.query.page
    let fetchedPosts;
    const postQuery = Post.find();
    if (pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize)
    }
    postQuery.then(documents => {
        fetchedPosts = documents
        return Post.count()
    }).then(count => {
        res.status(200).json({
            message: "Posts fetched successfully",
            posts: fetchedPosts,
            maxPosts: count
        })
    })
}
exports.getPostById = (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: 'Post not found'
            })
        }
    })
}
exports.createPost = (req, res, next) => {
    const url = req.protocol + '://' + req.get("host")
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
        creator: req.userData.userId
    })
    post.save().then((createdPost) => {
        res.status(201).json({
            message: 'Post added successfully',
            post: {
                ...createdPost,
                id: createdPost._id,
            }
        })
    })
}

exports.deletePost = (req, res, next) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
        .then((result) => {
            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'Post Deleted successfully' })
            } else {
                res.status(200).json({ message: 'Not Authorized' })
            }
        })
}

exports.updatePost = (req, res, next) => {
    let imagePath = req.body.imagePath
    if (req.file) {
        const url = req.protocol + '://' + req.get("host")
        imagePath = url + "/images/" + req.file.filename
    }
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
    })
    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
        .then(result => {
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'Post updated successfully' })
            } else {
                res.status(200).json({ message: 'Not Authorized' })
            }
        })
}