import { Button, Container, Stack, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useState } from "react"


const RegisterPage = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleRegister = async () => {
        try {
            const response = await axios.post("/api/users", form)
            const data = response.data;
            const status = response.status;
            console.log(data, status);
            setErrors({});//RESETEAMOS LOS ERRORES
            setForm({})
        } catch (error) {
            console.log(error.response?.data?.errors);
            setErrors(error.response?.data?.errors);
        }
    }

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
                <Typography variant="h2">
                    Register
                </Typography>

                <Stack sx={{ width: 360 }} spacing={2}>
                    <TextField
                        type="text"
                        variant="outlined"
                        placeholder="Tu Nombre"
                        label="Nombre"
                        value={form.name || ""}
                        onChange={(e)=>setForm({...form, name: e.target.value})}
                        error={errors.name ? true : false}
                        helperText={errors.name ? errors.name.message : ""}
                    />
                    <TextField
                        type="text"
                        variant="outlined"
                        placeholder="Tu Apellido"
                        label="Apellido"
                        value={form.lastName || ""}
                        onChange={(e)=>setForm({...form, lastName: e.target.value})}
                        error={errors?.lastName ? true : false}
                        helperText={errors?.lastName ? errors.lastName.message : ""}
                    />
                    <TextField
                        type="email"
                        variant="outlined"
                        placeholder="example@gmail.com"
                        label="Email"
                        value={form.email || ""}
                        onChange={(e)=>setForm({...form, email: e.target.value})}
                        error={errors?.email ? true : false}
                        helperText={errors?.email ? errors.email.message : ""}
                    />
                    <TextField
                        type="password"
                        variant="outlined"
                        label="Password"
                        value={form.password || ""}
                        onChange={(e)=>setForm({...form, password: e.target.value})}
                        error={errors?.password ? true : false}
                        helperText={errors?.password ? errors.password.message : ""}
                    />
                    <TextField
                        type="password"
                        variant="outlined"
                        label="Confirm Password"
                        value={form.confirmPassword || ""}
                        onChange={(e)=>setForm({...form, confirmPassword: e.target.value})}
                        error={errors?.confirmPassword ? true : false}
                        helperText={errors?.confirmPassword ? errors.confirmPassword.message : ""}
                    />
                    <Button variant="contained" color="primary" onClick={handleRegister} >Register</Button> 
                </Stack>
            </Container>
            
        </>
 )
}

export default RegisterPage;