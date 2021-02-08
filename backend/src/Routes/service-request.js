const router = require('express').Router();
const OrderRequest = require('../model/order-request');

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
router.get('/order-request/',
    (req,res, next) => {

        const order1 = {
            id: "1",
            subject: "subject1",
            body: "body1",
            date: new Date()
        }
        const order2 = {
            id:"2",
            subject: "subject2",
            body: "body2",
            date: new Date()
        }

        const orders = {
            orders :[order1, order2]
        }


        res
            .send(
                orders
            )
        next();
    }
)

router.get('/order-request/detail/:id',
    (req,res,next) => {
        const order2 = {
            id:"2",
            subject: "subject2",
            body: "body2",
            date: new Date()
        }

        res
            .status(200)
            .send({
                order2
            })

})

router.post('/order-request/',
    async (req,res, next) => {
      const orderRequest = {
        subject: req.body.subject,
        body: "wep" //req.body.subject,

      }
      console.log(orderRequest)
      const or=   new OrderRequest (orderRequest)
        console.log(or)
        try{
            await or.save();

            res
                .status(200)
                .send(
                    {orderRequest}
                )
            next();

        }catch (e) {
            console.log(e)
            res
                .status(400)
                .json({
                error:'error'
            })
        }

    }
)

module.exports = router;