const goodService = require('../services/good-service/good-service');
const Good = require('../models/good-model')
const uuid = require('uuid');
const path = require('path')

class GoodController {
    async createGood(req, res) {
        try {
            const {category, title, discription, size, color, sex, price} = req.body;
            const {img} = req.files;
            let fileNames = []
            img.map((elem) => {
                let fileName = uuid.v4() + '.jpg';
                elem.mv(path.resolve(__dirname, '..', 'static', fileName))
                fileNames.push(fileName)
            })
            const good = await goodService.createGood(category, title, discription, size, color, sex, price, fileNames);
            return res.json(good)
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
    async getOneGood(req, res) {
        try {
            const goodId = req.params.id;
            const good = await goodService.getOneGood(goodId);
            return res.json(good)
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
    async getAll(req, res) {
        try {
            const goods = await goodService.getAll();
            return res.json(goods)
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
    async getAllCategorySort(req, res) {
        try {
            let {limit, page} = req.query;
            page = page || 1;
            limit = limit || 5
            let offset = limit * page - limit
            const {sexId, category} = req.params;
            await Good.find({sex: sexId, category}).limit(limit).skip(offset).exec((err, doc) => {
                if(err) {
                    throw new Error('Ошибка получения списка товаров')
                }
                return res.json(doc) ;
            });
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
    async addToBasket (req, res) {
        try {
            const accessToken = req.headers.authorization.split(' ')[1];
            const {activeColor, activeSize, activePrice} = req.body;
            const goodId = req.params.id;
            const basket = await goodService.addToBasket(accessToken, goodId, activeColor, activeSize, activePrice);
            return res.json(basket);
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
    async removeFromBasket (req, res) {
        try {
            const userId = req.params.id;
            const {number} = req.body;
            const basket = await goodService.removeFromBasket(userId, number)
            return res.json(basket)
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
    async removeOne (req, res) {
        try {
            const {id} = req.params;
            await goodService.removeOne(id);
            return res.json('Товар удален')
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
    async updateOne(req, res) {
        try {
            const {category, title, discription} = req.body;
            const {id} = req.params;
            const good = await goodService.updateGood(id, category, title, discription);
            return res.json(good)
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
    async addData(req, res) {
        try {
            const {size, color, price} = req.body;
            const {id} = req.params;
            const {img} = req.files;
            let fileNames = []
            img.map((elem) => {
                let fileName = uuid.v4() + '.jpg';
                elem.mv(path.resolve(__dirname, '..', 'static', fileName))
                fileNames.push(fileName)
            })
            const good = await goodService.addData(id, size, color, price, fileNames);
            return res.json(good)
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
}
module.exports = new GoodController();