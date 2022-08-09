const User = require('./models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secretKey } = require('../config')
const saltRounds = 7

module.exports = class AuthController {
    async registration(req, res, body) {
        if (!req.headers.authorization) return res.end(JSON.stringify({ message: 'Нет authorization' }))

        try {
            const { login, firstName, lastName, password } = JSON.parse(body)
            const candidate = await User.findOne({ login })

            if (candidate) {
                res.statusCode = 400
                return res.end(JSON.stringify({ message: 'Пользователь уже существует!' }))
            }

            this.__validateCombine(firstName, lastName, login, password, (messages) => {
                return res.end(JSON.stringify(messages))
            })

            const hashPassword = bcrypt.hashSync(password, saltRounds)
            const user = new User({ firstName, lastName, login, password: hashPassword })
            await user.save()

            res.statusCode = 200
            return res.end(JSON.stringify({ message: 'Пользователь создан!', data: user }))
        } catch (e) {
            return e
        }
    }

    async login(req, res, body) {
        try {
            const { login, password } = JSON.parse(body)
            const user = await User.findOne({ login })

            if (!user) {
                res.statusCode = 400
                return res.end(JSON.stringify({ message: 'Пользователь не найден' }))
            } else {
                const validPassword = bcrypt.compareSync(password, user.password)
                if(!validPassword) return res.end(JSON.stringify({message: 'Пароль неверный'}))
            }

            const token = this.__generateAccessToken(user._id, user.login)
            return res.end(JSON.stringify(token))
        } catch (e) {
            return e
        }

    }

    __validateCombine(firstName, lastName, login, password, err) {
        const messages = []

        if (!this.__validateNames(firstName)) messages.push('Не правильное Имя')
        if (!this.__validateNames(lastName)) messages.push('Не правильная Фамилия')
        if (!this.__validateNames(login)) messages.push('Не валидный Логин')
        if (!this.__validatePassword(password)) messages.push('Не валидный Пароль')

        if (messages.length > 0) err(messages)
    }

    __validatePassword(password) {
        const regexp = /.*[0-9a-zA-Z!@#$%^&*]{6,}/i
        return regexp.test(password)
    }

    __validateNames(name) {
        const regexp = /.*[a-zA-Z*]{2,}/i
        return regexp.test(name)
    }

    __generateAccessToken(id, login) {
        const payload = {
            id,
            login
        }

        return jwt.sign(payload, secretKey)
    }

    // TODO -:- Написать нормальную валидацию
}