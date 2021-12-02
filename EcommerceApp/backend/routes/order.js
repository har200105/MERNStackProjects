const { addOrder, updateOrder, deleteOrder, getOrder,
     getAllOrders, getMonthlyIncome } =
 require('../controllers/order');

const router = require('express').Router();
router.post('/addOrder',reqlogin,addOrder);
router.put('/updateOrder/:id',reqadmin,updateOrder);
router.delete('/deleteOrder/:id',reqlogin,deleteOrder);
router.get('/getOrder',reqlogin,getOrder);
router.get('/getAllOrders',reqadmin,getAllOrders);
router.get('getMonthlyIncome',reqadmin,getMonthlyIncome);
module.exports = router;