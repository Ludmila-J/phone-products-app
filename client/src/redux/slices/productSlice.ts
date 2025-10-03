import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// TypeScript interface pour le produit
export interface Product {
  _id: string;
  name: string;
  type: string;
  price: number;
  rating: number;
  warranty_years: number;
  available: boolean;
}

// Interface du state
interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

// State initial
const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

// Thunk pour récupérer les produits depuis le backend
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get<Product[]>("http://localhost:4000/api/products");
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productAdded: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    productUpdated: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) state.items[index] = action.payload;
    },
    productDeleted: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((p) => p._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { productAdded, productUpdated, productDeleted } = productSlice.actions;

export default productSlice.reducer;







// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";  

// import axios from "axios";



// // URL backend
// const API_URL = "http://localhost:4000/api/products";

// // typescript interfaces
// export interface Product {
//   _id: string;
//   name: string;
//   type: string;
//   price: number;
//   rating: number;
//   warranty_years: number;
//   available: boolean;
// }

// interface ProductState {
//   items: Product[];
//   loading: boolean;
//   error: string | null;
// }

// // initial state
// const initialState: ProductState = {
//   items: [],
//   loading: false,
//   error: null,
// };

// // (CRUD API) Thunks pour récupérer les produits depuis l'API
// export const fetchProducts = createAsyncThunk("products/fetch", async () => {
//   const res = await axios.get("API_URL/products");
//   return res.data as Product[];
// });

// export const createProduct = createAsyncThunk(
//   "products/create",
//   async (newProduct: Omit<Product, "_id">) => {
//     const res = await axios.post(API_URL, newProduct);
//     return res.data;
//   }
// );

// export const updateProductThunk = createAsyncThunk(
//   "products/update",
//   async ({ id, product }: { id: string; product: Partial<Product> }) => {
//     await axios.put(`${API_URL}/${id}`, product);
//     return { id, product };
//   }
// );

// export const deleteProductThunk = createAsyncThunk(
//   "products/delete",
//   async (id: string) => {
//     await axios.delete(`${API_URL}/${id}`);
//     return id;
//   }
// );


// // création du slice
//  const productSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     // actions déclenchées par Socket.IO
//     productAdded: (state, action: PayloadAction<Product>) => {
//       state.items.push(action.payload);
//     },
//     productUpdated: (state, action: PayloadAction<Product>) => {
//       const index = state.items.findIndex(p => p._id === action.payload._id);
//       if (index !== -1) state.items[index] = action.payload;
//     },
//     productDeleted: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter(p => p._id !== action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder

//       .addCase(fetchProducts.pending, (state) => { state.loading = true; 
//         state.error = null;
//       })

//       .addCase(fetchProducts.fulfilled, (state, action) => { 
//         state.loading = false; 
//         state.items = action.payload; 
//       })

//       .addCase(fetchProducts.rejected, (state, action) => { 
//         state.loading = false; 
//         state.error = action.error.message || "Failed to fetch products"; 
//       });
//   },
// });

// export const { productAdded, productUpdated, productDeleted } = productSlice.actions;
// export default productSlice.reducer;
