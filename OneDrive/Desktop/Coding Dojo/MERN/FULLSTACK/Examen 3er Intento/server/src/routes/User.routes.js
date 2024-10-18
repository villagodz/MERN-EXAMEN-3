import express from 'express';
import UserControllers from '../controllers/User.controllers.js';
import authenticate from '../../config/jwt.config.js';

const router = express.Router();

//CREATE
router.post("/", UserControllers.create);

//Find all
router.get("/", authenticate, UserControllers.findAll)

//FIND BY ID
router.get("/:id", authenticate, UserControllers.findById);

export default router