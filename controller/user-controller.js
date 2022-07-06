const userService = require('../services/user-service/user-service');
const { validationResult } = require('express-validator');

class UserController {
    async registration (req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json(errors)
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(`Мы отправили письмо на почту ${email} для подтверждения`)
        } catch (e) {
            console.log(e)
            return res.status(400).json(`Ошибка регистрации: ${e.message}`)
        }
    }
    async login (req, res) {
        try {
            const {email, password} = req.body;
            const user = await userService.login(email, password);
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
            return res.json(user)
        } catch (e) {
            return res.status(400).json(`Ошибка авторизации: ${e.message}`)
        }
    }
    async logout (req, res) {
        try {
            const {refreshToken} = req.cookies;
            await userService.logout(refreshToken);
            res.clearCookie('refreshToken')
            return res.json('Вы вышли из аккаунта')
        } catch (e) {
            return res.status(400).json(`Ошибка авторизации: ${e.message}`)
        }
    }
    async activation (req, res) {
        try {
            const {link} = req.params;
            await userService.activation(link);
            res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            return res.status(400).json(`Ошибка активации: ${e.message}`)
        }
    }
    async basket (req, res) {
        try {
            const {userId} = req.params;
            const user = await userService.basket(userId);
            return res.json(user)
        } catch (e) {
            return res.status(400).json(`Ошибка доступа к корзине: ${e.message}`)
        }
    }
    async authCheck(req, res) {
        try {
            return res.json('Success')
        } catch (e) {
            return res.status(400).json('Failed function')
        }
    }
    async findUser(req, res) {
        try {
            const {email} = req.body;
            await userService.findUser(email);
            return res.json('Письмо для восстановления отправлено на почту')
        } catch (e) {
            return res.status(400).json('Пользователь не найден')
        }
    }
    async passRecovery(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json(errors)
            }
            const {email, password} = req.body;
            await userService.passRecovery(email, password);
            return res.json('Успех')
        } catch (e) {
            return res.status(400).json('Пользователь не найден')
        }
    }
}
module.exports = new UserController();