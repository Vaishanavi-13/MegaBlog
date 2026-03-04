import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: false,
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.user = action.payload;
        },
        logout: (state) => {   
            state.status = false;
            state.user = null;
         }
    }

})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;