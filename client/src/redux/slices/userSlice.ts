// client/src/redux/slices/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";

export interface User {
  _id: string;
  email: string;
  username?: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// Thunk pour login
export const loginUser = createAsyncThunk<
  { token: string; user: User }, // return type
  { email: string; password: string }, // arg type
  { rejectValue: string }
>("user/login", async (credentials, thunkAPI) => {
  try {
    const res = await api.post("/auth/login", credentials);
    // on attend { token, user } du backend
    return res.data as { token: string; user: User };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Thunk pour register
export const registerUser = createAsyncThunk<
  { token: string; user: User },
  { email: string; password: string; username?: string },
  { rejectValue: string }
>("user/register", async (payload, thunkAPI) => {
  try {
    const res = await api.post("/auth/register", payload);
    return res.data as { token: string; user: User };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token); // garde le token
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? action.error.message ?? "Erreur de connexion";
    });

    // register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? action.error.message ?? "Erreur d'inscription";
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;




// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface UserState {
//   token: string | null;
//   email: string | null;
// }

// const initialState: UserState = {
//   token: null,
//   email: null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     loginSuccess: (state, action: PayloadAction<{ token: string; email: string }>) => {
//       state.token = action.payload.token;
//       state.email = action.payload.email;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.email = null;
//     },
//   },
// });

// export const { loginSuccess, logout } = userSlice.actions;
// export default userSlice.reducer;


// // import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// // import axios from "axios";

// // interface User {
// //   _id: string;
// //   username: string;
// //   email: string;
// // }

// // interface UserState {
// //   user: User | null;
// //   token: string | null;
// //   loading: boolean;
// //   error: string | null;
// // }

// // const initialState: UserState = {
// //   user: null,
// //   token: localStorage.getItem("token") || null,
// //   loading: false,
// //   error: null,
// // };

// // // Thunk pour login
// // export const loginUser = createAsyncThunk(
// //   "user/login",
// //   async (data: { email: string; password: string }, thunkAPI) => {
// //     try {
// //       const res = await axios.post("http://localhost:4000/api/auth/login", data);
// //       localStorage.setItem("token", res.data.token);
// //       return res.data;
// //     } catch (err: any) {
// //       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
// //     }
// //   }
// // );

// // // Thunk pour register
// // export const registerUser = createAsyncThunk(
// //   "user/register",
// //   async (data: { username: string; email: string; password: string }, thunkAPI) => {
// //     try {
// //       const res = await axios.post("http://localhost:4000/api/auth/register", data);
// //       localStorage.setItem("token", res.data.token);
// //       return res.data;
// //     } catch (err: any) {
// //       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
// //     }
// //   }
// // );

// // const userSlice = createSlice({
// //   name: "user",
// //   initialState,
// //   reducers: {
// //     logout: (state) => {
// //       state.user = null;
// //       state.token = null;
// //       localStorage.removeItem("token");
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(loginUser.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
// //         state.loading = false;
// //         state.user = action.payload.user;
// //         state.token = action.payload.token;
// //       })
// //       .addCase(loginUser.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload as string;
// //       })
// //       .addCase(registerUser.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
// //         state.loading = false;
// //         state.user = action.payload.user;
// //         state.token = action.payload.token;
// //       })
// //       .addCase(registerUser.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload as string;
// //       });
// //   },
// // });

// // export const { logout } = userSlice.actions;
// // export default userSlice.reducer;




// // !!!!!!!!!!!!!!!!!!!!!!!!!!
// // import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // interface UserState {
// //   token: string | null;
// //   username: string | null;
// // }

// // const initialState: UserState = {
// //   token: localStorage.getItem("token"),
// //   username: null,
// // };

// // const userSlice = createSlice({
// //   name: "user",
// //   initialState,
// //   reducers: {
// //     setUser: (state, action: PayloadAction<{ token: string; username: string }>) => {
// //       state.token = action.payload.token;
// //       state.username = action.payload.username;
// //       localStorage.setItem("token", action.payload.token);
// //     },
// //     logout: (state) => {
// //       state.token = null;
// //       state.username = null;
// //       localStorage.removeItem("token");
// //     },
// //   },
// // });

// // export const { setUser, logout } = userSlice.actions;
// // export default userSlice.reducer;
