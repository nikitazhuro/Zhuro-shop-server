const categoriesModel = require("../../models/categories-model");

class CategoriesService {
    async createCategoryMen(categories) {
        try {
            const model = await categoriesModel.find()
            model[0].men.push(categories.toUpperCase())
            return model[0].save()
        } catch (e) {
            throw new Error(`Ошибка создания категории: ${e.message}`)
        }
    }
    async createCategoryWomen(categories) {
        try {
            const model = await categoriesModel.find()
            model[0].women.push(categories.toUpperCase())
            return model[0].save()
        } catch (e) {
            throw new Error(`Ошибка создания категории: ${e.message}`)
        }
    }
    async allCategories() {
        try {
            const model = await categoriesModel.find()
            const categories = model[0]
            return categories;
        } catch (e) {
            throw new Error(`Ошибка получения категорий: ${e.message}`)
        }
    }
    async removeCategoryMen(categories) {
        try {
            const model = await categoriesModel.find()
            model[0].men.pull(categories)
            return model[0].save()
        } catch (e) {
            throw new Error(`Ошибка создания категории: ${e.message}`)
        }
    }
    async removeCategoryWomen(categories) {
        try {
            const model = await categoriesModel.find()
            model[0].women.pull(categories)
            return model[0].save()
        } catch (e) {
            throw new Error(`Ошибка создания категории: ${e.message}`)
        }
    }

}
module.exports = new CategoriesService();