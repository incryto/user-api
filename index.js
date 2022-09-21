require('dotenv').config()

const express =  require('express')
app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const redis = require('./services/redis')
const mongo = require('./services/mongo-db')

const cors = require('cors')
app.use(cors({
    origin: '*'
}))


app.get("/",(req,res)=>{
    console.log("welcome to coin api")
    res.status(200).send("welcome to coin api")
})

const v1_user = require('./routes/v1/users')
app.use('/v1/users',v1_user)


app.listen(process.env.PORT,()=>{
    console.log("started running app on port",process.env.PORT)
    mongo.set_connection()
})