import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import products from './controllers/products.js'
import Orders from './controllers/orders.js'


const app = express()

app.use(express.json())

app.use(express.urlencoded({
    extended: false
}))

app.use(cors())


app.use('/products', products)
app.use('/orders', Orders)


const init = async () => {
    try {
        mongoose.connect('mongodb://localhost/OrderManagment');

        app.listen(5001)

        console.log('prisijungimas prie DB pavyko')
    } catch (err) {
        console.log(err)
    }
}

init()




