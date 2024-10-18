import React, { useEffect, useState } from 'react';
import { Container, Typography, Stack, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AddLibroPage = () => {
    const [user, setUser] = useState({});

    const getUser = async () => {
        const response = await axios.get("/api/auth");
        const data = response.data;
        setUser(data)
        
    }

    useEffect(() => {
        getUser();
    }, [])

    const [libro, setLibro] = useState({
        tittle: "",
        author: "",
        publicationYear: "",
        genre: "",
        urlImg: "",
    });
    const [errors, setErrors] = useState({
        tittle: "",
        author: "",
        publicationYear: "",
        genre: "",
        urlImg: ""
    });
    const navigate = useNavigate();

    const handleAddTask = async () => {
        try {
            const response = await axios.post('/api/libros', libro);
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
                    value={libro.tittle}
                    onChange={(e) => setLibro({ ...libro, tittle: e.target.value })}
                    error={errors.tittle ? true : false}
                    helperText={errors.description ? errors.tittle.message : ""}
                />
                <TextField
                    type="text"
                    variant="outlined"
                    label="Autor"
                    value={libro.author}
                    onChange={(e) => setLibro({ ...libro, author: e.target.value })}
                    error={errors.author ? true : false}
                    helperText={errors.author ? errors.author.message : ""}
                />
                <TextField
                    type="text"
                    variant="outlined"
                    label="Año"
                    value={libro.publicationYear}
                    onChange={(e) => setLibro({ ...libro, publicationYear: e.target.value })}
                    error={errors.publicationYear ? true : false}
                    helperText={errors.publicationYear ? errors.publicationYear.message : ""}
                />
                <TextField
                    type="text"
                    variant="outlined"
                    label="Genero"
                    value={libro.genre}
                    onChange={(e) => setLibro({ ...libro, genre: e.target.value })}
                    error={errors.genre ? true : false}
                    helperText={errors.genre ? errors.genre.message : ""}
                />
                <TextField
                    type="text"
                    variant="outlined"
                    label="URL a Imagen"
                    value={libro.urlImg}
                    onChange={(e) => setLibro({ ...libro, urlImg: e.target.value })}
                    error={errors.urlImg ? true : false}
                    helperText={errors.urlImg ? errors.urlImg.message : ""}
                />
                <Button variant="contained" color="primary" onClick={handleAddTask}>Agregar</Button>
            </Stack>
        </Container>
    );
};

export default AddLibroPage;