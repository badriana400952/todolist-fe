import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiData } from "../../utils/ApiData";

export interface IList {
    id: number
    name: string
    option: string
    aktifitasId: number | undefined
}

export interface IAktifitas {
    id: number
    name: string
    created_at?: string
    list: IList[]
}


interface InitialAktifitas {
    aktifitas: IAktifitas[]
    loading: boolean
    error: string | null
}

const initialState: InitialAktifitas = {
    aktifitas: [],
    loading: false,
    error: null
}


export const getAktifitas = createAsyncThunk("aktifitas/getAktifitas", async () => {
    try {
        const ress = await ApiData.get("/aktifitases", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log("ini ress", ress.data)
        return ress.data
    } catch (error) {
        console.log(error)
        throw error
    }
})
export const aktifitasID = createAsyncThunk('aktifitas/aktifitasID', async (id: number) => {
    try {
      const ress = await ApiData.get(`/aktifitas/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return ress.data;
    } catch (error) {
        console.log(error)
      throw error;
    }
  });

  export const addAktifitas = createAsyncThunk('aktifitas/addAktifitas', async (newData: IAktifitas) => {
    try {
      const ress = await ApiData.post(`/aktifitas/`, newData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return ress.data;
    } catch (error) {
        console.log(error)
      throw error;
    }
  });

  export const deleteAktifitas = createAsyncThunk('aktifitas/deleteAktifitas', async (id: number) => {
    try {
      const ress = await ApiData.delete(`/aktifitas/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return ress.data;
    } catch (error) {
        console.log(error)
      throw error;
    }
  });

const aktifitasSlice = createSlice({
    name: "aktifitas",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAktifitas.pending, (state) => {
                state.loading = true,
                state.error = null
            })
            .addCase(getAktifitas.fulfilled, (state, action) => {
                state.loading = false
                state.aktifitas = action.payload
                state.error = null
            })
            .addCase(getAktifitas.rejected, (state) => {
                state.loading = false
                state.error = "error getAktifitas"
            })

            .addCase(aktifitasID.pending, (state) => {
                state.loading = true,
                state.error = null
            })
            .addCase(aktifitasID.fulfilled, (state, action) => {
                state.loading = false;
                state.aktifitas = action.payload;
                state.error = null;
            })
            .addCase(aktifitasID.rejected, (state) => {
                state.loading = false
                state.error = "error getAktifitas"
            })

            .addCase(addAktifitas.pending, (state) => {
                state.loading = true,
                state.error = null
            })
            .addCase(addAktifitas.fulfilled, (state, action) => {
                state.loading = false;
                state.aktifitas = action.payload;
                state.error = null;
            })
            .addCase(addAktifitas.rejected, (state) => {
                state.loading = false
                state.error = "error getAktifitas"
            })


            .addCase(deleteAktifitas.pending, (state) => {
                state.loading = true,
                state.error = null
            })
            .addCase(deleteAktifitas.fulfilled, (state, action) => {
                state.loading = false;
                state.aktifitas = action.payload;
                state.error = null;
            })
            .addCase(deleteAktifitas.rejected, (state) => {
                state.loading = false
                state.error = "error getAktifitas"
            })
    }
})

export default aktifitasSlice.reducer