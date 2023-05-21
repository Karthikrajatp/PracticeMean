const express = require('express')
const app = express()


const morgan = require('morgan')
app.use(morgan('dev'))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test03')

const User = require('./models/userModel')

const bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.use(express.static('/Users/karthikrajatp/Desktop/6th sem/pracmean/client'))
app.get('/',(req,res)=>{
    res.sendFile('/Users/karthikrajatp/Desktop/6th sem/pracmean/client/views/index.html')
})
app.post('/api/addUser',(req,res)=>{
    try{
    var newUser = new User()
    newUser.username = req.body.username
    newUser.password = req.body.password
    newUser.save()
    res.sendStatus(200);
    }
    catch(err){
        console.log(err);
    }
})

app.post('/api/login',async(req,res)=>{
    try{
    var username = req.body.username
    var password = req.body.password
    var user = await User.findOne({username:username})
    if(user.password == password){
        res.send(true)
    }else{
        res.send(false)
    }
    }
    catch(err){
        console.log(err);
    }
})

app.get('/api/getUsers', async (req,res)=>{
    var data = await User.find()
    res.send(data)
})

app.listen(3000,()=>{
    console.log('server is running at port 3000')
})