const jwt = require('jsonwebtoken');
const Token = require('../../models/token-model')
class TokenService {
    createTokens(payload) {
        try {
            const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1d'})
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
            return {
                accessToken,
                refreshToken
            }
        } catch (e) {
            console.log(e.message)
        }
    }
    validAccessToken(token) {
        try {
            const tokenData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return tokenData;
        } catch (e) {
            throw new Error('Неверный токен')
        }
    }
    async saveTokens (id, refreshToken) {
        const token = await Token.findOne({user: id})
        if(token){
            token.refreshToken = refreshToken;
            return token.save();
        }
        await Token.create({user: id, refreshToken});
    }
}
module.exports = new TokenService();