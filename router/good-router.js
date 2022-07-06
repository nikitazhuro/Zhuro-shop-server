const Router = require('express');
const router = new Router();
const goodController = require('../controller/good-controller')

router.post('/createGood', goodController.createGood);
router.get('/goods/:id', goodController.getOneGood);
router.get('/goods', goodController.getAll);
router.get('/goodsCategoryPage/:sexId&:category', goodController.getAllCategorySort)
router.post('/goods/:id/addToBasket', goodController.addToBasket);
router.post('/goods/:id/removeFromBasket', goodController.removeFromBasket);
router.get('/goods/:id/removeOne', goodController.removeOne)
router.post('/goods/:id/updateOne', goodController.updateOne)
router.post('/goods/:id/addData', goodController.addData)

module.exports = router;