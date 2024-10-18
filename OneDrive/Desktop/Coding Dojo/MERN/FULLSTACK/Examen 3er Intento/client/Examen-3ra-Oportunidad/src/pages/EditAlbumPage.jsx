import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios  from "axios";


const EditAlbumPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const getAlbum = async () => {
        //PETICIÓN PARA OBTENER UN ALBUM POR ID
        const response = await axios.get(`/api/albumes/${id}`);
        const data = response.data;
        setAlbum(data);
        
    }

    const [album, setAlbum] = useState({
        tittle: "",
        artist: "",
        releaseDate: "",
        genre: "",
        trackCount: ""
    });
    
    const [errors, setErrors] = useState({
        tittle: "",
        artist: "",
        releaseDate: "",
        genre: "",
        trackCount: ""
    });

    
    
    const handleUpdateAlbum = async () => {
        try {
            //PETICIÓN PARA ACTUALIZAR UN LIBRO POR ID
            const response = await axios.put(`/api/albumes/${id}`, album);
            const data = response.data;
            setAlbum(data);
            navigate("/app/home")
        } catch (error) {
            console.log(error)
        }

    }
    
    const handleDeleteAlbum = async () => {
        try {
            //PETICIÓN PARA ELIMINAR UN LIBRO POR ID
            const response = await axios.delete(`/api/albumes/${id}`);
            const data = response.data;
            console.log(data);
            navigate("/app/home")
        } catch (error) {
            console.log(error)
        }
        
    }
    
    useEffect(() => {
        getAlbum();
    }, []);

    useEffect(() => {
        if (album.releaseDate) {
            setAlbum(prevAlbum => ({
                ...prevAlbum,
                releaseDate: album.releaseDate.split('T')[0] 
            }));
        }
    }, [album]);

    return(
        <>
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
                <Typography variant="h4">Editar Album</Typography>
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
                    <Button variant="contained" color="warning" onClick={handleUpdateAlbum}>Editar</Button>
                    <Button variant="contained" color="error" onClick={handleDeleteAlbum}>Eliminar</Button>
                </Stack>
            </Container>
        </>
    )
}

export default EditAlbumPage;