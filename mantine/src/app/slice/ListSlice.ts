import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiData } from "../../utils/ApiData";
import { IList } from "./AktifitasSLice";



interface ILisState {
    list: IList[]
    loading: boolean
    error: string | null
}

const initialState: ILisState = {
    list: [],
    loading: false,
    error: ""
}


export const addList = createAsyncThunk("list/addList", async (data: IList) => {
    try {
        const ress = await ApiData.post("/list", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
        return ress.data
    } catch (error) {
        console.log(error)
    }
   
})
export const deleteData = createAsyncThunk("list/deleteData", async (id: number) => {
    try {
        const ress = await ApiData.delete(`/list/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
        return ress.data
    } catch (error) {
        console.log(error)
    }
})


const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(addList.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addList.fulfilled, (state, action) => {
                state.list = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(addList.rejected, (state) => {
                state.loading = false
                state.error = "Error lis slice"
            })

            .addCase(deleteData.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteData.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload
                state.error = null
            })
            .addCase(deleteData.rejected, (state) => {
                state.loading = false
                state.error = "Error lis slice"
            })
    }

})

export default listSlice.reducer