import React, { useEffect, useState } from 'react';
import { Container, Typography, Stack, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AddAlbumPage = () => {
    const [user, setUser] = useState({});

    const getUser = async () => {
        const response = await axios.get("/api/auth");
        const data = response.data;
        setUser(data)
        
    }

    useEffect(() => {
        getUser();
    }, [])

    const [album, setAlbum] = useState({
        tittle: "",
        artist: "",
        releaseDate: "",
        genre: "",
        trackCount: "",
    });
    const [errors, setErrors] = useState({
        tittle: "",
        artist: "",
        releaseDate: "",
        genre: "",
        trackCount: "",
    });
    const navigate = useNavigate();

    const handleAddAlbum = async () => {
        try {
            const response = await axios.post('/api/albumes', album);
            const data = response.data;
            console.log(data);
            navigate('/app/home'); // Redirigir a la página inicial
        } catch (error) {
            console.log(error.response.data.errors);
            setErrors(error.response?.data?.errors);

        }
    }

    return (
        <Container 
            maxWidth="xs" 
            sx={{
                mt: 4,
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "auto", 
                bgcolor: "#f5f5f5", 
                borderRadius: 2, 
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}>
                
            <Typography variant="h4">Agregar Libro</Typography>

            <Stack sx={{ width: "100%" }} spacing={2}>
                <TextField
                    type="text"
                    variant="outlined"
                    label="Titulo"
                    value={album.tittle}
                    onChange={(e) => setAlbum({ ...album, tittle: e.target.value })}
                    error={errors.tittle ? true : false}
                    helperText={errors.description ? errors.tittle.message : ""}
                />
                <TextField
                    type="text"
                    variant="outlined"
                    label="Artista"
                    value={album.artist}
                    onChange={(e) => setAlbum({ ...album, artist: e.target.value })}
                    error={errors.artist ? true : false}
                    helperText={errors.artist ? errors.artist.message : ""}
                />
                <TextField
                    type="date"
                    variant="outlined"
                    value={album.releaseDate}
                    onChange={(e) => setAlbum({ ...album, releaseDate: e.target.value })}
                    error={errors.releaseDate ? true : false}
                    helperText={errors.releaseDate ? errors.releaseDate.message : ""}
                />
                <TextField
                    type="text"
                    variant="outlined"
                    label="Genero"
                    value={album.genre}
                    onChange={(e) => setAlbum({ ...album, genre: e.target.value })}
                    error={errors.genre ? true : false}
                    helperText={errors.genre ? errors.genre.message : ""}
                />
                <TextField
                    type="text"
                    variant="outlined"
                    label="Numero de Pistas"
                    value={album.trackCount}
                    onChange={(e) => setAlbum({ ...album, trackCount: e.target.value })}
                    error={errors.trackCount ? true : false}
                    helperText={errors.trackCount ? errors.trackCount.message : ""}
                />
                <Button variant="contained" color="primary" onClick={handleAddAlbum}>Agregar</Button>
            </Stack>
        </Container>
    );
};

export default AddAlbumPage;