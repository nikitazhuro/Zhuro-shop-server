const categoriesService = require('../services/categories-service/categories-service')

class CategoriesController {
    async createCategoryMen(req, res) {
        try {
            const {categories} = req.body;
            await categoriesService.createCategoryMen(categories);
            return res.json('Success')
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
    async createCategoryWomen(req, res) {
        try {
            const {categories} = req.body;
            await categoriesService.createCategoryWomen(categories)
            return res.json('Success')
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
    async allCategories(req, res) {
        try {
            const categories = await categoriesService.allCategories()
            return res.json(categories)
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
    async removeCategoryMen(req, res) {
        try {
            const {categories} = req.body;
            await categoriesService.removeCategoryMen(categories);
            return res.json('Success')
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
    async removeCategoryWomen(req, res) {
        try {
            const {categories} = req.body;
            await categoriesService.removeCategoryWomen(categories);
            return res.json('Success')
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
}

module.exports = new CategoriesController();