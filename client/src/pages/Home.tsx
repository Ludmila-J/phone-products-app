import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchProducts,
  productAdded,
  productUpdated,
  productDeleted,
} from "../redux/slices/productSlice";
import ProductCard from "../components/ProductCard";
import Grid from "@mui/material/Grid"; 
import { Container, Typography, CircularProgress } from "@mui/material";
import { io } from "socket.io-client";

// Socket.IO connection vers ton backend
const socket = io("http://localhost:4000");

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());

    // socket.on("productCreated", (newProduct) => dispatch(productAdded(newProduct)));
    // socket.on("productUpdated", (updatedProduct) => dispatch(productUpdated(updatedProduct)));
    // socket.on("productDeleted", ({ _id }) => dispatch(productDeleted(_id)));

    // return () => {
    //   socket.off("productCreated");
    //   socket.off("productUpdated");
    //   socket.off("productDeleted");
    //   socket.disconnect();
    // };
  }, [dispatch]);

  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        📱 Liste des produits
      </Typography>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={2}>
        {items.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={String(product._id || product.name)}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;








// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "../redux/store";
// import {
//   fetchProducts,
//   productAdded,
//   productUpdated,
//   productDeleted,
// } from "../redux/slices/productSlice";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import CircularProgress from "@mui/material/CircularProgress";
// // import Grid from "@mui/material/Grid";
// import Grid2 from '@mui/material/Unstable_Grid2';

// import ProductCard from "../components/ProductCard";
// import { io } from "socket.io-client";

// // URL de ton backend (ajuste si nécessaire)
// const socket = io("http://localhost:4000");

// const Home: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { items, loading, error } = useSelector((state: RootState) => state.products);

//   useEffect(() => {
//     dispatch(fetchProducts());

//     socket.on("productCreated", (newProduct) => {
//       dispatch(productAdded(newProduct));
//     });

//     socket.on("productUpdated", (updatedProduct) => {
//       dispatch(productUpdated(updatedProduct));
//     });

//     socket.on("productDeleted", ({ _id }) => {
//       dispatch(productDeleted(_id));
//     });

//     return () => {
//       socket.off("productCreated");
//       socket.off("productUpdated");
//       socket.off("productDeleted");
//       socket.disconnect();
//     };
//   }, [dispatch]);

//   return (
//     <Container sx={{ paddingY: 4 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         📱 Liste des produits
//       </Typography>

//       {loading && <CircularProgress />}

//       {error && (
//         <Typography color="error" sx={{ marginY: 2 }}>
//           {error}
//         </Typography>
//       )}

//       <Grid2 container spacing={3}>
//         {items.map((product) => (
//           <Grid2 item xs={12} sm={6} md={4} key={String(product._id)}>
//             <ProductCard product={product} />
//           </Grid2>
//         ))}
//       </Grid2>
//     </Container>
//   );
// };

// export default Home;





// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "../redux/store";
// import { fetchProducts, productAdded, productUpdated, productDeleted } from "../redux/slices/productSlice";
// import { Grid, Container, Typography, CircularProgress } from "@mui/material";
// import ProductCard from "../components/ProductCard";
// import { io } from "socket.io-client";

// //  connexion au backend via Socket.IO
// const socket = io("http://localhost:4000");

// const Home: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { items, loading, error } = useSelector((state: RootState) => state.products);

//   useEffect(() => {
//     // Charger les produits au montage
//     dispatch(fetchProducts());

//     // Ecouter les événements Socket.IO
//     socket.on("productCreated", (newProduct) => {
//       dispatch(productAdded(newProduct));
//     });

//     socket.on("productUpdated", (updatedProduct) => {
//       dispatch(productUpdated(updatedProduct));
//     });

//     socket.on("productDeleted", ({ _id }) => {
//       dispatch(productDeleted(_id));
//     });

//     // Nettoyer les events au démontage
//     return () => {
//       socket.off("productCreated");
//       socket.off("productUpdated");
//       socket.off("productDeleted");
//     };
//   }, [dispatch]);

//   return (
//     <Container>
//       <Typography variant="h3" align="center" gutterBottom>
//         📱 Liste des Produits
//       </Typography>

//       {loading && <CircularProgress />}
//       {error && <Typography color="error">{error}</Typography>}

//       <Grid container spacing={3}>
//         {items.map((product) => (
//           <Grid item xs={12} sm={6} md={4} key={String(product._id)}>
//             <ProductCard product={product} />
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Home;



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// // Page Home avec Socket.IO
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts, productAdded, productUpdated, productDeleted } from "../redux/slices/productSlice";
// import { AppDispatch, RootState } from "../redux/store";
// import { io } from "socket.io-client";
// import ProductCard from "../components/ProductCard";

// // URL du serveur backend
// const socket = io("http://localhost:4000"); 

// const Home: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const products = useSelector((state: RootState) => state.products.items);

//   useEffect(() => {
//     // Charger les produits depuis l'API
//     // Appel de l'action thunk
//     dispatch(fetchProducts());

//     // Écouter les événements Socket.IO
//     socket.on("productCreated", (product) => dispatch(productAdded(product)));
//     socket.on("productUpdated", (product) => dispatch(productUpdated(product)));
//     socket.on("productDeleted", ({ _id }) => dispatch(productDeleted(_id)));

//     // Cleanup
//     return () => {
//       socket.disconnect();
//     };
//   }, [dispatch]);

//   // Handlers temporaires pour Edit/Delete (à compléter plus tard avec API)
//   const handleEdit = (id: string) => {
//     console.log("Edit product:", id);
//   };

//   const handleDelete = (id: string) => {
//     console.log("Delete product:", id);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Liste des produits</h1>
//       {products.map((p) => (
//         <ProductCard
//           key={p._id}
//           id={p._id}
//           name={p.name}
//           price={p.price}
//           onEdit={() => handleEdit(p._id)}
//           onDelete={() => handleDelete(p._id)}
//         />
//       ))}
//     </div>
//   );
// };

// export default Home;
