const mongoose =require('mongoose')

exports.connection = ()=>{
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_URL,()=>console.log('database connected !'))
}
