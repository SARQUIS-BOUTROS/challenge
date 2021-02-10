const router = require('express').Router();
const orderNumberGenerator =  require('../functions/orderNumberGenerator/order-number-generator');
const OrderRequest = require('../model/order-request');
let fs = require('fs');
const { body, validationResult } = require('express-validator');

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
    const file = `${__dirname}/result_document.pdf`;
    //http://expressjs.com/en/api.html#res.download
    res.download(file, 'report.pdf')

/*
    console.log(file)
    try {
        res.download(file);
    }catch (e) {
        console.log(e)
        res
            .status(400)
            .json({
                error:"error"
            })
    }
     // Set disposition and send it.
    next()
    */
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
/**
 * @swagger
 * /order-request:
 *   post:
 *     summary: Add order request
 *     responses:
 *         200:
 *             Order request added
 *
 */


router.post('/order-request/', [
    body('subject')
        .notEmpty()
        .withMessage(`subject can't not empty`),
    body('body')
        .notEmpty()
        .withMessage(`body can't not empty`)
],
    (req, res, next) => {
        const errors = validationResult(req).array();

        if (errors.length > 0) {
            res
                .status(400)
                .json({
                    error: {
                        code: 400,
                        details: errors,
                        message: 'validation failed'
                    }
                });
            return next();
        }

        let code = orderNumberGenerator();
        const orderRequest = {
            subject: req.body.subject,
            body: req.body.body,
            code: code,
            filename:req.body.filename,
            date_created: new Date(),
            date_updated:new Date(),
            rejected: false,
            ready: false
        }

        let stringToDecode = req.body.file;

        if (req.body.filename != null) {
            stringToDecode = stringToDecode.replace(/^data:application\/pdf;base64,/, "");
            fs.writeFile(`${__dirname}/../files/${code}_${req.body.filename}`, stringToDecode, 'base64', (error) => {
                if (error) throw error;
                console.log("Doc saved!");
            });
        }
        const or = new OrderRequest(orderRequest)
        try {
            or.save();
            res
                .status(200)
                .send(
                    {orderRequest: orderRequest}
                )

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