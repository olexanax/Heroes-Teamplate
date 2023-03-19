import { createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

// const initialState = {
//     filtersLoadingStatus: 'idle',
//     filters: [],
//     activeFilter : 'all'
// }

const filtersAdapter = createEntityAdapter()

const initialState = filtersAdapter.getInitialState({
    activeFilter : 'all',
    filtersLoadingStatus: 'idle',
})

export const fetchFilters = createAsyncThunk(
    'filter/fetchFilters',
    () => {
        const {request} = useHttp()
        return request("http://localhost:3001/filters")
    }
)


const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers: {
        changeFilter: (state, {payload}) => {state.activeFilter = payload}
    },
    extraReducers: builder => {
        builder
            .addCase(fetchFilters.pending, (state) => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, {payload}) => {
                filtersAdapter.setAll(state, payload)
                state.filtersLoadingStatus = 'idle'
            })
            .addCase(fetchFilters.rejected,  state => {state.filtersLoadingStatus= 'error'})
            .addDefaultCase(()=>{})
    }
})

const {reducer, actions} = filterSlice;
export const {selectAll} = filtersAdapter.getSelectors(state => state.filters)

export default reducer;
export const {
    changeFilter
    } = actions