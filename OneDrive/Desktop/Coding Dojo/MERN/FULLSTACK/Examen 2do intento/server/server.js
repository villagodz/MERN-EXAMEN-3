import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import dbConnect from './config/mongoose.config.js';
import cookieParser from 'cookie-parser';
//IMPORTACION DE ROUTES
import librosRoutes from './src/routes/libros.routes.js';
import userRoutes from './src/routes/users.routes.js'
import authRoutes from './src/routes/auth.routes.js'


dotenv.config();
const app = express();
const PORT = process.env.PORT;

//CONFIGURACIONES
app.use(express.json());

app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
))

app.use(cookieParser());

//USO DE RUTAS  
//Rutas tareas
app.use("/api/libros", librosRoutes)

//Rutas de usuarios
app.use("/api/users", userRoutes)   
//Rutas de sesiones
app.use("/api/auth", authRoutes)    



// Crear la conexión con LA BD
dbConnect();

//Iniciamos el servidor
app.listen(PORT, () => {
    //Mostramos mensaje en consola
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});