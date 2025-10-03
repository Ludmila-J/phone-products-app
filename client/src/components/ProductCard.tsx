import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Product } from "../redux/slices/productSlice";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Card sx={{ minHeight: 180, margin: 1 }}>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">Type: {product.type}</Typography>
        <Typography variant="body2">Prix: {product.price} €</Typography>
        <Typography variant="body2">Note: {product.rating} ⭐</Typography>
        <Typography variant="body2">
          Garantie: {product.warranty_years} an(s)
        </Typography>
        <Typography variant="body2" color={product.available ? "green" : "red"}>
          {product.available ? "Disponible" : "Indisponible"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// import React from "react";
// import { Card, CardContent, Typography } from "@mui/material";
// import { Product } from "../redux/slices/productSlice";

// interface Props {
//   product: Product;
// }

// const ProductCard: React.FC<Props> = ({ product }) => {
//   return (
//     <Card sx={{ minHeight: 200, backgroundColor: "#f9f9f9" }}>
//       <CardContent>
//         <Typography variant="h6">{product.name}</Typography>
//         <Typography variant="body2">Type: {product.type}</Typography>
//         <Typography variant="body2">Prix: {product.price} €</Typography>
//         <Typography variant="body2">Note: {product.rating} ⭐</Typography>
//         <Typography variant="body2">
//           Garantie: {product.warranty_years} ans
//         </Typography>
//         <Typography variant="body2" color={product.available ? "green" : "red"}>
//           {product.available ? "Disponible" : "Indisponible"}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductCard;




// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// import React from "react";
// import { Card, CardContent, Typography, Button } from "@mui/material";

// interface Props {
//   id: string;
//   name: string;
//   price: number;
//   onEdit: () => void;
//   onDelete: () => void;
// }

// const ProductCard: React.FC<Props> = ({ id, name, price, onEdit, onDelete }) => {
//   return (
//     <Card sx={{ margin: 1 }}>
//       <CardContent>
//         <Typography variant="h6">{name}</Typography>
//         <Typography>Price: ${price}</Typography>
//         <Button variant="contained" color="primary" onClick={onEdit} sx={{ marginRight: 1 }}>
//           Edit
//         </Button>
//         <Button variant="contained" color="error" onClick={onDelete}>
//           Delete
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductCard;
