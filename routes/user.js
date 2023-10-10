const express = require('express')
const { getUser, createUser, login, getUserById } = require('../controllers/user')
const { upload } = require("../multer");
const { authenticateUser } = require('../middlewares/auth');
const router = express.Router()

router.get('/get-user', authenticateUser, getUser)
router.get('/get-user/:id',getUserById)
router.post('/create-user',upload.single("file"), createUser)
router.post('/login',login)
module.exports=router