const userService = require('../service/user-service')

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password, type } = req.body;
            const userData = await userService.registration(email, password, type)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }catch (e) {
            console.error(e)
        }
    }

    async login() {
        try {

        }catch (e) {
            console.error(e)
        }
    }

    async logout() {
        try {

        }catch (e) {
            console.error(e)
        }
    }

    async activate() {
        try {

        }catch (e) {
            console.error(e)
        }
    }

    async refresh() {
        try {

        }catch (e) {
            console.error(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            console.log(res)
            res.json(['123', '123', '2'])
        }catch (e) {
            console.error(e)
        }
    }
}

module.exports = new UserController()