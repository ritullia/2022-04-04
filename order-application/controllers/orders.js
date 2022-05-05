import express from 'express'
import Orders from '../models/orders.js'

import products from '../models/products.js'


const Router = express.Router()

Router.get('/get-orders', async (req, res) => {

    let list = await Orders.find()
    let index = 0;

    for (let order of list) {
        if (order.product) {
            const product = await products.findOne({ _id: order.product })

            list[index].product = product.product_name
        }
        // list[index].productPrice = product.dicount_price ? product.discount_price : product.price

        index++
    }

    res.json(list)
})


Router.post('/save-order', async (req, res) => {

    let myOrder = new Orders(req.body)
    myOrder.save()
        .then(result => {
            console.log(result)
            res.json({ message: "Užsakymas sėkmingai priimtas" })

        })
        .catch(err => {
            res.send("Įvyko techninė klaida")
        })

})


Router.delete('/delete-order/:id', async (req, res) => {

    Orders.findByIdAndDelete(req.params.id).exec()
    Orders.find((err, data) => {
        if (err)
            return console.log(err)

        res.json(data)
    })

})





export default Router