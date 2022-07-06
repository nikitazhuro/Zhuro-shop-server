const Basket = require('../../models/basket-model');

class BasketService {
    async createBasket (id) {
        const basket = await Basket.create({user: id})
        return basket;
    }
}

module.exports = new BasketService();