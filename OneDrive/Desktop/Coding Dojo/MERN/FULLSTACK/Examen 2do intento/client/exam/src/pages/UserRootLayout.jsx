import { AppBar, Box, Toolbar, Typography, Button, Container } from "@mui/material";
import { Outlet, Link } from "react-router-dom";

const UserRootLayout = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* Título del lado izquierdo */}
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Libros
            </Typography>

            {/* Botones de Login y Register del lado derecho */}
            <Button color="inherit" component={Link} to="login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="register">
              Register
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Contenido principal */}
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default UserRootLayout;
