const uuid = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../../models/user-model');
const Token = require('../../models/token-model');
const Basket = require('../../models/basket-model');
const tokenService = require('./token-service');
const basketService = require('./basket-service');
const mailService = require('./mail-service');
const TokenDto = require('../../dtos/token-dto');


class UserService {
    async registration (email, password) {
        const candidate = await User.findOne({email});
        if(candidate){
            throw new Error('Такой пользователь уже существует')
        }

        const activationLink = uuid.v4();
        const hashPassword = await bcrypt.hash(password, 5);

        const newUser = await User.create({email, password: hashPassword, activationLink, role: 'user'});
        await mailService.sendMailActivation(email, `${process.env.API_URL}/api/user/activation/${activationLink}`)

        const basket = await basketService.createBasket(newUser._id);

        const userDto = new TokenDto(newUser);
        const tokens = tokenService.createTokens({...userDto});
        await tokenService.saveTokens(userDto.id, tokens.refreshToken);
        return {...tokens, userDto}
    }
    async login(email, password) {
        const user = await User.findOne({email});
        if(!user){
            throw new Error('Пользователя с такой почтой не существует')
        }
        const hashPassword = await bcrypt.compare(password, user.password);
        if(!hashPassword) {
            throw new Error('Неверно указан пароль')
        }

        const userDto = new TokenDto(user);
        const tokens = tokenService.createTokens({...userDto});
        await tokenService.saveTokens(userDto.id, tokens.refreshToken);
        return {...tokens, userDto}

    }
    async logout (refreshToken) {
        const token = await Token.deleteOne({refreshToken});
        return token
    }
    async activation(link) {
        const user = await User.findOne({activationLink: link})
        if(!user){
            throw new Error('Неверная ссылка на активацию')
        }
        user.isActivated = true;
        return user.save();
    }
    async basket(userId) {
        const user = await User.findOne({userId});
        if(!user){
            throw new Error('Неверный id');
        }
        const basket = await Basket.findOne({userId});
        if(!basket) {
            throw new Error('Корзина для этого пользователя не найдена');
        }
        return basket.save();
    }
    async findUser (email) {
        const candidate = await User.findOne({email});
        if(!candidate){
            throw new Error('Пользователь не найден')
        }
        const recoverYLink = uuid.v4();
        await mailService.sendMailRecovery(email, `${process.env.CLIENT_URL}/Logon/passRecovery/${recoverYLink}`)
    }
    async passRecovery (email, password) {
        const user = await User.findOne({email});
        const hashPassword = await bcrypt.hash(password, 5)
        user.password = hashPassword;
        return user.save()
    }

}
module.exports = new UserService();