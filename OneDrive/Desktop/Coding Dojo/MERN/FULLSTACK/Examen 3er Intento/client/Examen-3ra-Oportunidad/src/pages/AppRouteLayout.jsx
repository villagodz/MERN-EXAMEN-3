import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material"
import { Link, Outlet } from "react-router-dom"
import axios from "axios";

const AppRouteLayout = () => {

    const getSession = async () => {
        await axios.get("/api/auth")
    }

    const handleLogout= async () => {
        const respuesta = await axios.delete("/api/auth");
        const data = respuesta.data;
        console.log(data);
        getSession();
    }

    return(
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        {/* Título del lado izquierdo */}
                        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                            Libros
                        </Typography>
                        <Button color="inherit" component={Link} to="/app/home">
                            Todos los albums
                        </Button>
                        <Button color="inherit" component={Link} to="/app/addAlbum">
                            Agregar album
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>             
            <Container>
                <Outlet />
            </Container>
        </>
    )
}

export default AppRouteLayout;