import express from 'express';
import userControllers from '../controllers/users.controllers.js';
import authenticate from '../../config/jwt.config.js';

const router = express.Router();

//CREATE
router.post("/", userControllers.create);

//Find all
router.get("/", authenticate, userControllers.findAll)

//FIND BY ID
router.get("/:id", authenticate, userControllers.findById);

export default router