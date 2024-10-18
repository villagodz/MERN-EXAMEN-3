import Libro from "../models/Libro.model.js";


const create = async (req,res) => {
    try {
        const data = req.body;
        const newElement = await Libro.create(data);
        res.status(201).json(newElement);
        return
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
        return;
    }
}

const findAll = async (req, res) => {
    try {
        const elements = await Libro.find();
        res.status(200).json(elements);
        return;
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
        return;
    }
}

const updateById = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const element = await Libro.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!element) {
            res.json("NOT FOUND").status(404);
            return;
        }
        res.status(200).json(element);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        return;
    }
}

const findById = async (req,res) => {
    try {
        const id = req.params.id;
        const element = await Libro.findById(id);
        if(!element){
            res.status(404).res({mensaje: "NOT FOUND"})
            return
        }
        res.status(200).json(element);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        return;
    }
}

const deleteById = async (req,res) => {
    try {
        const id = req.params.id;
        const element = await Libro.findByIdAndDelete(id);
        if(!element){
            res.status(404).res({mensaje: "NOT FOUND"})
            return
        }
        res.status(200).json(element);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        return;
    }
}

export default {
    create,
    findAll,
    updateById,
    findById,
    deleteById
}