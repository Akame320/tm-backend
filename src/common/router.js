const Auth = require('../authController')
const { checkAuth } = require('../middleware/authMiddleware')

module.exports = class Router {
    getApi(url, req, res, body) {
        const rout = apiRouts[url]
        if (!rout) return res.end('Сервер работает! Но APi path не найден')

        if (rout.type === "GET") rout.handler(req, res)
        else rout.handler(req, res, body)
    }
}

const apiRouts = {
    '/auth/registration': {
        type: 'POST',
        handler: (req, res, body) => {
            const auth = new Auth()
            auth.registration(req, res, body)
        }
    },
    '/auth/login': {
        type: 'POST',
        handler: (req, res, body) => {

            const auth = new Auth()
            auth.login(req, res, body)
        }
    },
    '/kogo/lubit/anton': {
        type: 'GET',
        handler: (req, res) => {
            checkAuth(req, res, () => {

            })
        }
    }
}