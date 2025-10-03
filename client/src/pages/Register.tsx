import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { registerUser } from "../redux/slices/userSlice";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(registerUser({ username, email, password }));

    // Sauvegarder le token si inscription réussie
    if (registerUser.fulfilled.match(resultAction)) {
      localStorage.setItem("token", resultAction.payload.token);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Inscription
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nom d'utilisateur"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Mot de passe"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? "Chargement..." : "S'inscrire"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;






// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../redux/store";
// import { registerUser } from "../redux/slices/userSlice";
// import { TextField, Button, Container, Typography, Box } from "@mui/material";

// const Register: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error } = useSelector((state: RootState) => state.user);

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     dispatch(registerUser({ username, email, password }));
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box mt={5}>
//         <Typography variant="h4" gutterBottom>Inscription</Typography>
//         {error && <Typography color="error">{error}</Typography>}
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Nom d'utilisateur"
//             fullWidth
//             margin="normal"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <TextField
//             label="Email"
//             fullWidth
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             label="Mot de passe"
//             type="password"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button type="submit" variant="contained" color="primary" disabled={loading}>
//             {loading ? "Chargement..." : "S'inscrire"}
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default Register;
