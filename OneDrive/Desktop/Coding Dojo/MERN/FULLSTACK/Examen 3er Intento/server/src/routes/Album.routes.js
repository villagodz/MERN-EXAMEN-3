import express from "express";
import AlbumControllers from "../controllers/Album.controllers.js";
import authenticate from '../../config/jwt.config.js';

const router = express.Router();

//CREATE
router.post("/", authenticate, AlbumControllers.create);

//Find All
router.get("/", authenticate, AlbumControllers.findAll);

//BUSCAR ALBUM POR ID
router.get("/:id", authenticate, AlbumControllers.findById)

//Update by id
router.put("/:id", authenticate, AlbumControllers.updateById)

//ELIMINAR ALBUM POR ID
router.delete("/:id", authenticate, AlbumControllers.deleteById)


export default router;
