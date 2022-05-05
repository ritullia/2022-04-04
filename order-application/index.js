import express from 'express'
import mongoose from 'mongoose'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import products from './controllers/products.js'
import Orders from './controllers/orders.js'


const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))


app.use(express.json())
app.use(cors())

app.use(express.urlencoded({
    extended: false
}))



app.use('/products', products)
app.use('/orders', Orders)


app.use('/assets', express.static('public/assets'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

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




