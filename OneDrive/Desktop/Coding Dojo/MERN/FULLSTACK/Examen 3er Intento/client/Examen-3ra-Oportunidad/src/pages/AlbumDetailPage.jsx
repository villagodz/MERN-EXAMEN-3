import { Button, Card, CardContent, Typography, Container, Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const AlbumDetailPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    
    const getAlbum = async () => {
        try {
            const response = await axios.get(`/api/albumes/${id}`);
            const data = response.data;
            const formattedData = {
                ...data,
                releaseDate: data.releaseDate.split('T')[0], // Solo la fecha
            };
    
            console.log(formattedData); // Verifica los datos obtenidos
            setAlbum(formattedData);
            
        } catch (error) {
            console.log(error);
        }
    }
    
    const [album, setAlbum] = useState({
        tittle: "",
        artist: "",
        releaseDate: "",
        genre: "",
        trackCount: "",
    });
    
    
    useEffect(()=>{
        getAlbum();
    },[])
 
    
    
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


    return(
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant='h4' sx={{margin: '16px'}}>
                {album.tittle}
            </Typography>
            <Card sx={{ p: 3, boxShadow: 2 }}>
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="subtitle2" color="textSecondary">Artista</Typography>
                        <Typography variant="h5">{album.artist}</Typography>

                        <Typography variant="subtitle2" color="textSecondary">Fecha de lanzamiento</Typography>
                        <Typography variant="h5">{album.releaseDate}</Typography>

                        <Typography variant="subtitle2" color="textSecondary">Género</Typography>
                        <Typography variant="h5">{album.genre}</Typography>

                        <Typography variant="subtitle2" color="textSecondary">Número de pistas</Typography>
                        <Typography variant="h5">{album.trackCount}</Typography>
                    </Stack>
                </CardContent>
            </Card>

            <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleDeleteAlbum}
            >
                Eliminar álbum
            </Button>
        </Container>
    )
}

export default AlbumDetailPage