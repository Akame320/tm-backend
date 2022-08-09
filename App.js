const http = require('http')
const mongoose = require('mongoose')
const Router = require('./src/common/router')

const router = new Router()

const PORT = process.env.PORT || 9090
console.log(PORT)


const server = http.createServer((req, res,) => {
    res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' })
    const { header, url, methods } = req

    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        router.getApi(url, req, res, body)
    });

})

const start = async () => {
    try {
        await mongoose.connect('mongodb://root:example@mongo:27017', { useNewUrlParser: true }).then(() => {
            console.log("Database connected")
        }).catch((error) => {
            console.log("db error", error);
            process.exit(1);
        });
        console.log('Start Mongo')
        server.listen(PORT)
        console.log('Start server')
    } catch (e) {
        console.log(e)
    }
}

start()
