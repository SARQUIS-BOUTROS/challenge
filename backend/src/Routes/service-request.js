const router = require('express').Router();
const OrderRequest = require('../model/order-request');
let fs = require('fs');

/**
 * @swagger
 * /order-request:
 *   get:
 *     summary: Return order requests
 *     responses:
 *         200:
 *             description: ok las cosas
 *
 */
router.get(['/order-request/',
        '/order-request/:index'],
    (req, res, next) => {
    console.log(req.params.index)
        const order1 = {
            id: "1",
            subject: "subject1",
            body: "body1",
            date: new Date()
        }
        const order2 = {
            id: "2",
            subject: "subject2",
            body: "body2",
            date: new Date()
        }

        const orders = {
            orders: [order1, order2]
        }


        res
            .send(
                orders
            )
        next();
    }
)

router.get('/download/', (req, res, next) => {
    const file = `${__dirname}/../files/saludo.txt`;

    console.log(file)
    res.download(file); // Set disposition and send it.
    next()
});

router.get('/order-request/detail/:id',
    (req, res, next) => {
        const order2 = {
            id: "2",
            subject: "subject2",
            body: "body2",
            date: new Date()
        }

        res
            .status(200)
            .send({
                order: order2
            })

    })

router.post('/order-request/',
    (req, res, next) => {
        const orderRequest = {
            subject: req.body.subject,
            body: req.body.body,
            date: new Date()
        }

        let stringToDecode = req.body.file;

        stringToDecode = stringToDecode.replace(/^data:application\/pdf;base64,/, "");
        fs.writeFile('result_document.pdf', stringToDecode, 'base64', (error) => {
            if (error) throw error;
            console.log("Doc saved!");
        });

        const or = new OrderRequest(orderRequest)
        try {
            or.save();
            res
                .send(
                    {orderRequest: orderRequest}
                )
                .status(200)

            next();
        } catch (e) {
            console.log(e)
            res
                .status(400)
                .json({
                    error: 'error'
                })
        }

    }
)


module.exports = router;