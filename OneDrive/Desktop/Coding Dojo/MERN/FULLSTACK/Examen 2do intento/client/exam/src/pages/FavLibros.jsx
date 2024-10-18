import {  Box, Button, Card, CardContent, CardMedia, Grid2, Typography, TextField } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useEffect, useState } from "react";
import axios from "axios";


const FavLibros = () => {
    const [libros, setLibros] = useState([]);

    const getLibros = async () => {
        try {
            const response = await axios.get("/api/libros")
            const data = response.data;
            console.log(data);
            setLibros(data);    
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }

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

    useEffect(() => {
        getLibros();
    }, [])

    return(
        <>
            <Typography
                variant="h4"
            >
                Estos son tus Libros Favoritos
            </Typography>
            <Box>
                <Grid2 container spacing={2} sx={{ marginTop: 4, alignItems: "center" }}>
                    {
                        libros
                            .filter((libro) => libro.isFav === true) // Filtra solo los libros que son favoritos
                            .map((libro) => (
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
                                                    {
                                                        libro.isFav ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />
                                                    }
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
        </>
    )
}

export default FavLibros;