const tokenService = require('../services/user-service/token-service');

module.exports = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        if(!accessToken) {
            throw new Error('У вас нет доступа');
        }
        const tokenData = tokenService.validAccessToken(accessToken);
        if(!tokenData){
            throw new Error('invalid Data');
        }
        next()
    } catch (e) {
        return res.status(400).json(e.message)
    }
}