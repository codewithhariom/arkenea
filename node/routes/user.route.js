const express= require('express')
const router= express.Router()
const userController= require('../controller/user.controller')
const multer  = require('multer')

const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, `./uploads`)
     },
     filename: function (req, file, cb) {
       const uniqueSuffix = Math.round(Math.random() * 1E9)+file.originalname
       cb(null, file.fieldname + '-' + uniqueSuffix)
     }
   })
   
   const upload = multer({ storage: storage })

router.post('/',upload.single('ProfileImage'),userController.createUser)
     .get('/',userController.getUser)
     .get('/:userId',userController.getUserById)
     .put('/:userId',upload.single('ProfileImage'),userController.updateUser)
     .delete('/:userId',userController.deleteUser)


module.exports= router

