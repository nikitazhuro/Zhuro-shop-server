const Router = require('express');
const router = new Router();
const userController = require('../controller/user-controller');
const userMiddleware = require('../middleware/user-middleware');
const { body } = require('express-validator');

router.post('/registration', 
    body('email', "Некорректно введен Email").isEmail(),
    body('password', "Пароль должен быль не короче 4 и не длиннее 10 символов").isLength({min:4, max:10}), 
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/passRecovery', userController.findUser)
router.post('/passRecovery/newPass',
    body('password', "Пароль должен быль не короче 4 и не длиннее 10 символов").isLength({min:4, max:10}),
    userController.passRecovery)
router.get('/auth', userMiddleware, userController.authCheck)
router.get('/activation/:link', userController.activation);
router.get('/basket/:id', userController.basket);

module.exports = router;