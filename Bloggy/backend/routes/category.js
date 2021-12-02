const { addCategory ,getCategory} = require('../controllers/category');
const router = require('express').Router();
const reqLogin = require('../middleware/reqLogin');
router.post('/addCategory',addCategory);
router.get('/getCategories',getCategory);
module.exports = router;

