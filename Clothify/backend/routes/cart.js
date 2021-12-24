const { addToCart, updateCart, deleteCart, getAllCart, getUserCart } = require('../controllers/cart');
const reqlogin = require('../middleware/reqlogin');
const reqadmin = require('../middleware/reqadmin');
const router = require('express').Router();

router.post('/addToCart',reqlogin,addToCart);
router.put('/updateCart/:id',reqlogin,updateCart);
router.delete('/deleteCart/:id',reqlogin,deleteCart);
router.get('/getAllCart',reqadmin,getAllCart);
router.get('/getUserCart',reqadmin,getUserCart);


module.exports = router;