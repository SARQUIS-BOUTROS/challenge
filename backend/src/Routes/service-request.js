const router = require('express').Router();
const orderNumberGenerator = require('../functions/orderNumberGenerator/order-number-generator');
const OrderRequest = require('../model/order-request');
let fs = require('fs');
const {body, validationResult} = require('express-validator');

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
    async (req, res, next) => {
        console.log(req.params.index)
        try {
            const or = await OrderRequest.find({},
                ''
                , function (err, res) {
                    if (err) {
                        return err
                    }
                    return res
                });
            res
                .status(200)
                .send({
                    order: or
                })

        } catch (e) {
            console.log(e)
            res
                .status(400)
                .send({
                    error: `Error for get order with code ${req.body.id}`
                })
            next()
        }
    }
)

router.get('/file/:filename', (req, res, next) => {

    const file = `${__dirname}/../files/${req.params.filename}`;
    //http://expressjs.com/en/api.html#res.download
    console.log(file)
    res.download(file, `${req.params.filename}`)
});

/**
 * @swagger
 * /order-request/detail:
 *   get:
 *     summary: Get particular order request
 *     responses:
 *         200:
 *             Order request returned
 *
 */

router.get('/order-request/detail/:code',
    async (req, res, next) => {
        const code = req.params.code
        try {
            const or = await OrderRequest.find({code: code},
                ''
                , function (err, res) {
                    if (err) {
                        return err
                    }
                    return res
                });
            res
                .status(200)
                .send({
                    order: or[0]
                })

        } catch (e) {
            console.log(e)
            res
                .status(400)
                .send({
                    error: `Error for get order with code ${req.body.code}`
                })
            next()
        }

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
            filename: req.body.filename,
            date_created: new Date(),
            date_updated: new Date(),
            status: 'ONGOING'
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
/**
 * @swagger
 * /order-request:
 *   put:
 *     summary: Update order request status
 *     responses:
 *         200:
 *             Order request updated
 *
 */
router.put('/order-request/'
    ,[
        body('code')
            .notEmpty()
            .withMessage(`code can't not empty`),
        body('status')
            .notEmpty()
            .withMessage(`status can't not empty`)
    ]
    ,async (req, res, next)=> {
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
        const code = req.body.code;
        const status = req.body.status;
        try {
            const filter = {code: code };
            const update = { status: status , date_updated: new Date()};

            await OrderRequest.findOneAndUpdate(filter, update);
            const or = await OrderRequest.findOne(filter);
            res
                .status(200)
                .send({
                    order: or
                })

        } catch (e) {
            console.log(e)
            res
                .status(400)
                .send({
                    error: `Error for get order with code ${req.body.code}`
                })
            next()
        }
    })

module.exports = router;