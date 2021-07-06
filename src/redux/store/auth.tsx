import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    email: '',
}

const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.email = action.payload.email;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.email = '';
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;