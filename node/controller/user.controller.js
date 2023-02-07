const User= require('./../models/users')


module.exports = {
    createUser: async (req,res)=>{
        try{  
            const data= JSON.parse(req.body.data)
            if(req.file) data.ProfileImage=req.file.filename
            const create= await User.create(data)
            console.log(await User.find({}));
            if(create){
                return res.json({status:'success',statusCode:201,message:'user created! '})
            }
            return res.json({status:'fail',statusCode:400,message:'user not created'})
        }catch(error){
            if (error.name === "ValidationError") {
                let errors = {};
    
                Object.keys(error.errors).forEach((key) => {
                    errors[key] = error.errors[key].message;
                });
               
                return res.json({status:'fail',statusCode:400,error:errors})
                
            }
            return res.json({status:'fail',statusCode:400,message:error.message})
        }
    },

    getUser: async (req,res)=>{
       try{
        const users= await User.find({})
        console.log(users);
        return res.json({status:'success',statusCode:200,data:users})
       }catch(error){
        return res.json({status:'fail',statusCode:400,error:error.message})
       }
    },

    getUserById: async (req,res)=>{
        try{
            const user= await User.findById(req.params.userId)
            return res.json({status:'success',statusCode:200,data:user})
           }catch(error){
            return res.json({status:'fail',statusCode:400,error:error.message})
           }
    },
    updateUser: async (req,res)=>{
        try{
            const data= JSON.parse(req.body.data)
            if(req.file) data.ProfileImage=req.file.filename
            const user= await User.updateOne({_id:req.params.userId},{$set:data})
            if(user)
            return res.json({status:'success',statusCode:200,data:user})
            
           }catch(error){
            return res.json({status:'fail',statusCode:400,error:error.message})
           }
    },
    deleteUser: async (req,res)=>{
        try{
            const data= await User.deleteOne({_id:req.params.userId})
            return res.json({status:'success',statusCode:200,data})
           }catch(error){
            return res.json({status:'fail',statusCode:400,error:error.message})
           }
    }
}