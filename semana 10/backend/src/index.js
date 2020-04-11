'use strict'

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const {setupWebsocket} = require('./websocket')
const http = require('http')
const server = http.Server(app)

setupWebsocket(server)

app.use(express.json())
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-6nhph.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true    
})

const routes = require('./routes')

//get post put delete
/*
query params: req.query()
route param: /:id req.params ()
body: req.body()
*/

app.use(cors())
app.use(routes)
server.listen(3333)
