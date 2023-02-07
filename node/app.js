require('dotenv').config();
const express= require('express');
const cors= require('cors')
const app= express()
const PORT= process.env.PORT | 8000
const { connection} = require('./config/dbcon')

connection()
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));

app.get('/test',(req,res)=>{
    res.send('test')
})
//routes
app.use('/user',require('./routes/user.route'))

app.listen(PORT,()=>console.log(`server listen on http://localhost:${PORT}`))

