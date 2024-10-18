import { model, Schema } from 'mongoose';
import mongoose from 'mongoose';




const LibroSchema = new Schema({
    tittle: {
        type: String,
        required: [true, "El titulo es obligatorio!"],
        minLength: [5, "El titulo debe tener al menos 5 caracteres"],
        unique: [true, "Este libro ya existe!"],
    },
    author: {
        type: String,
        required: [true, "El autor es obligatorio!"],
    },
    publicationYear: {
        type: Number,
        required: [true, "La fecha es obligatoria."],
        validator: (year) => {
            return year >= 0;
        },
        message: "El año debe ser positivo."      
    },
    genre: {
        type: String,
        required: [true, "El genero es obligatorio."] 
    },
    urlImg: {
        type: String,
        required: [true, "Debe proporcionar una URL de una imagen!"],
        validate: {
            validator: function (value) {
                // Expresión regular para verificar si la URL termina con una extensión válida de imagen
                return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(value);
            },
            message: "La URL de la imagen debe terminar con una extensión válida (.jpg, .jpeg, .png, etc)."
        }
    },
    isFav: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });



const Libro = model("Libro", LibroSchema);


export default Libro;