import { model, Schema } from 'mongoose';

const AlbumSchema = new Schema({
    tittle: {
        type: String,
        required: [true, "El titulo del album es obligatorio!"],
        minLength: [5, "El titulo del album debe ser mayor a 5 caracteres!"],
        unique: [true, "Este album ya existe!"]
    },
    artist: {
        type: [String],
        required: [true, "El artista es obligatorio!"]
    },
    releaseDate: {
        type: Date,
        required: [true, "La fecha de lazamiento es obligatoria!"],
        validate: {
            validator: (value) => {
              return value instanceof Date && !isNaN(value.getTime()); // Verifica que sea una fecha válida
            },
            message: 'Por favor proporciona una fecha válida',
          }
    },
    genre: {
        type: String,
        required: [true, 'El género es obligatorio'],
        minlength: [3, 'El género debe tener al menos 3 caracteres'],
      },
    trackCount: {
        type: Number,
        required: [true, 'El número de pistas es obligatorio'],
        min: [1, 'Debe haber al menos 1 pista'],
        max: [10, 'No puede haber más de 10 pistas'],
    }
    
}, { timestamps: true });

const Album = model("Album", AlbumSchema);

export default Album;