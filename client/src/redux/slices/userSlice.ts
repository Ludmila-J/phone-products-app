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