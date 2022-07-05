import express from "express"
import {  deleteUser, getallUser, getUser, updateUser } from "../controllers/users.js";
import { createError } from "../utils/error.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();


//update
router.put('/:id',verifyUser,updateUser)
//delete
router.delete('/:id',verifyUser,deleteUser)
//get
router.get('/:id',verifyUser,getUser)
//getall
router.get('/',verifyAdmin,getallUser)

export default router