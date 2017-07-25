var express = require('express');
var path = require('path');
var Server = require('ws').Server;

const app = express();

app.use('/', express.static(path.join(__dirname, '..', 'client/dist')))

app.get('/api/products', (req, res) => {
    let result = products;
    let params = req.query;

    if(params.title){
        result = result.filter((p) => p.title.indexOf(params.title) !== -1);
    }

    if(params.price && result.length > 0){
        result = result.filter((p) => p.price <= parseInt(params.price));
    }

    if(params.category && params.category !== "-1" && result.length > 0){
        result = result.filter((p) => p.categories.indexOf(params.category) !== -1);
    }

    res.json(result);
});
app.get('/api/product/:id', (req, res) => {
    res.json(products.find((product) => product.id == req.params.id));
});
app.get('/api/product/:id/comments', (req, res) => {
    res.json(comments.filter((comment) => comment.productId == req.params.id));
});

const server = app.listen(3000, "localhost", () => {
    console.log("服务器已启动，地址是: http://localhost:3000");
});

const subscriptions = new Map();

const wsServer = new Server({port: 3085});
wsServer.on("connection", websocket => {
    websocket.on('message', message => {
        let messageObj = JSON.parse(message);
        let productIds = subscriptions.get(websocket) || [];
        subscriptions.set(websocket, [...productIds, messageObj.productId]);
    });
});

const currentBids = new Map();

setInterval(() => {

    products.forEach( p => {
        let currentBid = currentBids.get(p.id) || p.price;
        let newBid = currentBid + Math.random() * 5;
        if(newBid > 1000){
            newBid = 10;
        }
        currentBids.set(p.id, newBid);
    });

    subscriptions.forEach((productIds, ws) => {
        if(ws.readyState === 1) {
            let newBids = productIds.map( pid => ({
                productId: pid,
                bid: currentBids.get(pid)
            }));
            ws.send(JSON.stringify(newBids));
        }else{
            subscriptions.delete(ws);
        }

    });

}, 2000);

const products = [
    {"id":1,"title":"第一个商品","price":1.99,"rating":3.5,"desc":"这是第一个商品，是我在学习慕课网angular实战时创建的","imgUrl":"http://via.placeholder.com/320x150","categories":["电子产品","硬件设备"]},
    {"id":2,"title":"第二个商品","price":2.99,"rating":4.5,"desc":"这是第二个商品，是我在学习慕课网angular实战时创建的","imgUrl":"http://via.placeholder.com/320x150","categories":["电子产品"]},
    {"id":3,"title":"第三个商品","price":3.99,"rating":2.5,"desc":"这是第三个商品，是我在学习慕课网angular实战时创建的","imgUrl":"http://via.placeholder.com/320x150","categories":["硬件设备"]},
    {"id":4,"title":"第四个商品","price":4.99,"rating":1.5,"desc":"这是第四个商品，是我在学习慕课网angular实战时创建的","imgUrl":"http://via.placeholder.com/320x150","categories":["电子产品","硬件设备"]},
    {"id":5,"title":"第五个商品","price":5.99,"rating":4.5,"desc":"这是第五个商品，是我在学习慕课网angular实战时创建的","imgUrl":"http://via.placeholder.com/320x150","categories":["硬件设备"]},
    {"id":6,"title":"第六个商品","price":6.99,"rating":3.5,"desc":"这是第六个商品，是我在学习慕课网angular实战时创建的","imgUrl":"http://via.placeholder.com/320x150","categories":["图书"]}
];
const comments = [
    {"id":1,"productId":1,"timestamp":1500542285004,"user":"张三","rating": 3,"content": "哎呦，不错哦"},
    {"id":2,"productId":1,"timestamp":1500642285004,"user":"李四","rating": 4,"content": "有点意思"},
    {"id":3,"productId":1,"timestamp":1500742285004,"user":"王二麻子","rating": 2,"content": "so so~"},
    {"id":4,"productId":2,"timestamp":1500842285004,"user":"小淘气","rating": 4,"content": "哎呦，不错哦"}
];