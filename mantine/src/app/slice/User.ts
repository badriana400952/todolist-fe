import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiData } from "../../utils/ApiData";
import axios from "axios";

export interface IUSer {
    id: number
    name: string
    email: string
    password: string
}
export interface ILogin {
    email: string
    password: string

}

interface IUserState {
    user: IUSer[]
    loading: boolean
    error: string | null
    token: string,
    message: string

}

const initialState: IUserState = {
    user: [],
    loading: false,
    error: "",
    token: "",
    message: ""
}

export const login = createAsyncThunk("user/login", async (data: ILogin) => {
    const ress = await axios.post("http://localhost:3000/login", data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    localStorage.setItem("token", ress.data.token)
    return ress.data
})

export const getUser = createAsyncThunk("user/getUser", async () => {
    const ress = await ApiData.get("/user", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    return ress.data
})
export const addUser = createAsyncThunk("user/addUser", async (data: IUSer) => {
    const ress = await ApiData.post("/user", data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    return ress.data
})
export const deleteUser = createAsyncThunk("user/deleteUser", async (id: number) => {
    const ress = await ApiData.delete(`/user/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    return ress.data
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addToken: (state) => {
            state.token = localStorage.getItem("token") ?? "";
        },
        logoute: (state) => {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            localStorage.removeItem("message")
            state.token = "";
            state.user = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getUser.rejected, (state) => {
                state.loading = false
                state.error = "Error lis slice"
            })
            .addCase(addUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(addUser.rejected, (state) => {
                state.loading = false
                state.error = "Error lis slice"
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(deleteUser.rejected, (state) => {
                state.loading = false
                state.error = "Error lis slice"
            })
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
            })


            .addCase(login.fulfilled, (state,  { payload: { error, message, token, user } }) => {
                state.loading = false
                if(error) {
                    state.error = error
                }else{
                    state.message = message
                    state.token = token
                    state.user = user
                    localStorage.setItem("token", token)
                    localStorage.setItem("user", JSON.stringify(user))
                    localStorage.setItem("message", message)
                }
            })
            .addCase(login.rejected, (state) => {
                state.loading = false
                state.error = "Error lis slice"
            })
    }

})
export const { addToken, logoute } = userSlice.actions
export default userSlice.reducer