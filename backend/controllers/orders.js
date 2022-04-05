import express from 'express'
import Orders from '../models/orders.js'


const Router = express.Router()

Router.post('/save-order', (req, res) => {
    res.send(req.body)
})


export default Router