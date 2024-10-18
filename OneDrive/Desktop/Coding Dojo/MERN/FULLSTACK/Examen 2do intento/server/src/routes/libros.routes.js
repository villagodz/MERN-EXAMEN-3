import express from "express";
import librosControllers from "../controllers/libros.controllers.js";
import authenticate from '../../config/jwt.config.js';

const router = express.Router();

//CREATE
router.post("/", authenticate, librosControllers.create);

//Find All
router.get("/", authenticate, librosControllers.findAll);

//BUSCAR LIBRO POR ID
router.get("/:id", authenticate, librosControllers.findById)

//Update by id
router.put("/:id", authenticate, librosControllers.updateById)

//ELIMINAR LIBRO POR ID
router.delete("/:id", authenticate, librosControllers.deleteById)


export default router;
