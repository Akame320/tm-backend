const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt')
const tokenService = require('./token-service')
const UserDto = require('../dto/user-dto')

class UserService {
    async registration(email, password, type) {
        const candidate = await UserModel.findOne({ email })
        if (candidate) {
            throw new Error(`Пользователь с email ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        console.log(hashPassword)
        const user = await UserModel.create({ email, password: hashPassword, type })
        const userDto = new UserDto(user) // id, isActivate, email, type
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }
}

module.exports = new UserService()