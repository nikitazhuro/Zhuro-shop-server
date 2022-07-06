const Router = require('express');
const router = new Router();
const categoriesController = require('../controller/categories-controller');

router.post('/createCategoryMen', categoriesController.createCategoryMen);
router.post('/createCategoryWomen', categoriesController.createCategoryWomen);
router.get('/allCategories', categoriesController.allCategories);
router.post('/removeCategoryMen', categoriesController.removeCategoryMen);
router.post('/removeCategoryWomen', categoriesController.removeCategoryWomen);


module.exports = router;