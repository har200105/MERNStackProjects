const router = require('express').Router();
const {  addPost, getPost, deletePost, editPost,getPostById,
     getUserPosts, otherPosts,likePost,dislikePost, comment } = require('../controllers/post');
const reqLogin = require('../middleware/reqLogin');
router.post('/addPost', reqLogin,addPost );
router.get('/getPost', getPost);
router.delete('/deletePost/:id', reqLogin, deletePost);
router.put('/editPost/:id', reqLogin,editPost);
router.get('/getSinglePost/:id',getPostById);
router.get('/getUserPosts',reqLogin,getUserPosts);
router.get('/getPostById/:id',getPostById);
router.get('/otherPosts/:id',otherPosts);
router.put('/likePost/:id',reqLogin,likePost);
router.put('/dislikePost/:id',reqLogin,dislikePost);
router.post('/comment/:id',reqLogin,comment)

module.exports = router;