import {  Box, Button, Card, CardContent, CardMedia, Grid2, Typography, TextField } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";



const HomePage = () => {

    const [libros, setLibros] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [user, setUser] = useState({})
    
    const navigate = useNavigate();

    const getLibros = async () => {
        try {
            const response = await axios.get("/api/libros")
            const data = response.data;
            setLibros(data);        
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }

    const getUsers = async () => {
        const response = await axios.get("/api/auth");
        const data = response.data;
        setUser(data)
        
    }

    useEffect(() => {
        getLibros();
        getUsers();
    }, [])

    const handleIsFav = async (libroId, libro) => {
        try {
            const updatedIsFav = !libro.isFav;
            const body = { isFav: updatedIsFav }; 
            const response = await axios.put(`/api/libros/${libroId}`, body);
            const data = response.data;
            console.log(data)

            setLibros(prevLibros => 
                prevLibros.map(item => 
                    item._id === libroId ? { ...item, isFav: updatedIsFav } : item 
                )
            );
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (libroId) => {
        navigate(`/app/editLibros/${libroId}`)
    }

    const librosFiltrados = libros.filter((libro) => {
        return libro.tittle.toLowerCase().includes(filtro.toLowerCase());
    });

    return(
        <>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {/* BARRA DE NAVEGACION */} 
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                    <TextField
                        type="text"
                        variant="outlined"
                        placeholder="Buscar libro"
                        size="small"
                        value={filtro}
                        onChange={(e)=>setFiltro(e.target.value)}
                        sx={{ flexGrow: 1, marginRight: 2 }}
                    />
                    <Button variant="contained" color="warning" sx={{ height: '40px' }}>
                        Filtrar
                    </Button>
                </Box>
                {/* CARDS */}
                <Box >
                    <Grid2 container spacing={2} sx={{ marginTop: 4 , alignItems: "center"}}>
                        {
                            librosFiltrados.map((libro) => (
                                <Grid2 xs={12} sm={6} key={libro._id} sx={{ alignItems: "center" }}>
                                    <Card sx={{ display: 'flex', padding: 2, alignItems: 'center', width: '650px', backgroundColor: '#DCDCDC' }}>
                                        <CardMedia
                                            component="img"
                                            image={libro.urlImg}
                                            alt={libro.tittle}
                                            sx={{ width: 120 }}
                                        />
                                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '6px', border: '1px solid black', borderRadius: '4px', marginLeft: '12px' }}>
                                            <Typography variant="h6">{libro.tittle}</Typography>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', width: "480px", justifyContent: 'space-between' }}>
                                                <Typography variant="body1">Autor: {libro.author}</Typography>
                                                <Typography variant="body1">Año de publicación: {libro.publicationYear}</Typography>
                                                <Typography variant="body1">Género: {libro.genre}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button sx={{ color: 'black' }} onClick={() => handleIsFav(libro._id, libro)}>
                                                    {libro.isFav ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                                                </Button>
                                                <Button onClick={() => handleEdit(libro._id)} sx={{ color: 'black' }}>
                                                    <EditOutlinedIcon />
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid2>
                            ))    
                        }
                    </Grid2>
                </Box>
            </Box>
        </>
    )
}

export default HomePage;