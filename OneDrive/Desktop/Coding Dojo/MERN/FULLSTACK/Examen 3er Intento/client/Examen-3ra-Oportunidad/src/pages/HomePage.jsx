import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {

    const [albumes, setAlbumes] = useState([]);
    const [user, setUser] = useState({})
    
    const navigate = useNavigate();

    const getAlbumes = async () => {
        try {
            const response = await axios.get("/api/albumes")
            const data = response.data;
            setAlbumes(data);        
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }

    const getUsers = async () => {
        await axios.get("/api/auth");        
    }

    useEffect(() => {
        getAlbumes();
        getUsers();
    }, [])
 

  return (
    <TableContainer component={Paper} sx={{ width: '60%', margin: 'auto', marginTop: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell align="center">Detalle</TableCell>
            <TableCell align="center">Modificar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {albumes.map((album) => (
            <TableRow key={album._id}>
              <TableCell>{album.tittle}</TableCell>
              <TableCell align="center">
                <Button color="inherit" component={Link} to={`/app/detailAlbum/${album._id}`} >Ver álbum</Button>
              </TableCell>
              <TableCell align="center">
                <Button color="inherit" component={Link} to={`/app/editAlbum/${album._id}`}>Editar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HomePage;
