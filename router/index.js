const Router = require('express');
const router = new Router();
const userRouter = require('./user-router');
const goodRouter = require('./good-router');
const categoryRouter = require('./category-router');
 
router.use('/user', userRouter)
router.use('/good', goodRouter)
router.use('/categories', categoryRouter)

module.exports = router;