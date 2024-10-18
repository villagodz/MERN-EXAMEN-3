import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import dbConnect from './config/mongoose.config.js';
import cookieParser from 'cookie-parser';
//IMPORTACION DE ROUTES
import AlbumRoutes from './src/routes/Album.routes.js'
import AuthRoutes from './src/routes/Auth.routes.js'
import UserRoutes from './src/routes/User.routes.js'


dotenv.config();
const app = express();
const PORT = process.env.PORT;

//CONFIGURACIONES
app.use(express.json());

app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
));

app.use(cookieParser());

//USO DE RUTAS  
//Rutas tareas
app.use("/api/albumes", AlbumRoutes);

//Rutas de usuarios
app.use("/api/users", UserRoutes);   
//Rutas de sesiones
app.use("/api/auth", AuthRoutes);    



// Crear la conexión con LA BD
dbConnect();

//Iniciamos el servidor
app.listen(PORT, () => {
    //Mostramos mensaje en consola
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});