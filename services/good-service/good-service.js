const Good = require('../../models/good-model');
const User = require('../../models/user-model')
const tokenService = require('../user-service/token-service');
const Basket = require('../../models/basket-model');
const path = require('path')
const fs = require('fs')


class GoodService {
    async createGood (category, title, discription, size, color, sex, price, fileNames) {
        try {
            size = JSON.parse(size)
            const good = await Good.create({category, title: title.toUpperCase(), discription, sizes: [size],colors: [color.toUpperCase()], sex, prices: [price], img: [fileNames] });
            return good;
        } catch (e) {
            throw new Error(`Ошибка создания товара: ${e.message}`);
        }
    }
    async getOneGood (goodId) {
        try {
            const good = await Good.findOne({_id: goodId})
            if(!good) {
                throw new Error('Товар не найден')
            }
            return good
        } catch (error) {
            throw new Error(`Ошибка поиска товара: ${e.message}`);
        }
    }
    async getAll () {
        try {
            const goods = await Good.find();
            return goods
        } catch (e) {
            throw new Error(`Ошибка получения списка товаров: ${e.message}`);
        }
    }
    async getAllCategorySort (sexId, category) {
        try {
            const goods = await Good.find({sex: sexId, category});
            return goods
        } catch (e) {
            throw new Error(`Ошибка получения списка товаров: ${e.message}`);
        }
    }
    async addToBasket (accessToken, goodId, activeColor, activeSize, activePrice) {
        try {
            const tokenData = tokenService.validAccessToken(accessToken);
            const userBasket = await Basket.findOne({user: tokenData.id});
            if(!userBasket){
                throw new Error('Корзина не найдена');
            }
            const good = await Good.findOne({_id: goodId});
            userBasket.good.push(good)
            userBasket.activeColors.push(activeColor)
            userBasket.activeSizes.push(activeSize)
            userBasket.activePrices.push(activePrice)
            return userBasket.save()
        } catch (e) {
            throw new Error(`Ошибка добавления товара в корзину: ${e.message}`);
        }
    }
    async removeFromBasket (userId, number) {
        const userBasket = await Basket.findOne({user: userId});
        if(!userBasket){
            throw new Error('Корзина пользователя не найдена')
        }
        userBasket.good.splice(number, 1);
        userBasket.activeColors.splice(number, 1);
        userBasket.activePrices.splice(number, 1);
        userBasket.activeSizes.splice(number, 1);
        return userBasket.save()
    }
    async removeOne (goodId) {
        try {
            const good = await Good.findOneAndRemove({_id: goodId})

            good.img.map( async(elem) => {
                elem.map(async (e) => {
                    try {
                        fs.rmSync(path.resolve(__dirname, '..', '..', 'static', `${e}`))
                    } catch (e) {
                        console.log(e.message)
                    }
                })
            })
        } catch (e) {
            throw new Error(`Ошибка удаления: ${e.message}`)
        }
    }
    async updateGood (id, category, title, discription){
        try {
            const user = await Good.findByIdAndUpdate(id, {category, title: title.toUpperCase(), discription})
            return user
        } catch (e) {
            throw new Error(`Ошибка обновления товара: ${e.message}`)
        }
    }
    async addData (id, size, color, price, fileNames) {
        try {
            size = JSON.parse(size)
            const good = await Good.findOne({_id: id})
            if(!good) {
                throw new Error('Товар не найден')
            }
            good.sizes.push(size)
            good.colors.push(color.toUpperCase())
            good.prices.push(price)
            good.img.push(fileNames)
            await good.save()
            return good
        } catch (e) {
            throw new Error(`Ошибка добавления данных: ${e.message}`)
        }
    }

}

module.exports = new GoodService();