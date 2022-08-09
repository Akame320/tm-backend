const jwt = require('jsonwebtoken')
const { secretKey } = require('../../config')

module.exports.checkAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || null

    if (!token) return res.end(JSON.stringify({ message: 'Пользователь не авторизован' }))

    const decodeToken = jwt.verify(token, secretKey)

    if(decodeToken) {
        return res.end(JSON.stringify({ message: 'Пользователь авторизован' }))
    } else {
        return res.end(JSON.stringify({ message: 'Пользователь не авторизован' }))
    }

    next()
}