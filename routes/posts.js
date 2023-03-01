const express = require('express')

const PostController = require('../controllers/post')
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

const router = express.Router();

router.get('/getPosts',
PostController.getPosts
)
router.get('/getPost/:id',
PostController.getPostById
)
router.post('/addPost',
checkAuth,
extractFile,
PostController.createPost
)
router.delete('/deletePost/:id',
checkAuth,
PostController.deletePost
)
router.put('/updatePost/:id',
checkAuth,
extractFile,
PostController.updatePost
)

module.exports = router