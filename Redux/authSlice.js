import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        // show navbar.
        user: {},
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const {user, setUser} = authSlice.actions

export default authSlice.reducer
