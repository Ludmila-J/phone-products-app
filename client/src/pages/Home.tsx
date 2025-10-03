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

    socket.on("productCreated", (newProduct) => dispatch(productAdded(newProduct)));
    socket.on("productUpdated", (updatedProduct) => dispatch(productUpdated(updatedProduct)));
    socket.on("productDeleted", ({ _id }) => dispatch(productDeleted(_id)));

    return () => {
      socket.off("productCreated");
      socket.off("productUpdated");
      socket.off("productDeleted");
      socket.disconnect();
    };
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
