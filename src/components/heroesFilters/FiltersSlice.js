import { createSlice } from "@reduxjs/toolkit";
import { heroesFetching } from "../heroesList/heroesSlice";


const initialState = {
    filtersLoadingStatus: 'idle',
    filters: [],
    activeFilter : 'all'

}


const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers: {
        filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
        filtersFetched: (state, {payload}) => {
            state.filters = payload
            state.filtersLoadingStatus = 'idle'
        },
        filtersFetchingError: state => {state.filtersLoadingStatus= 'error'},
        changeFilter: (state, {payload}) => {state.activeFilter= payload}
    }
})

const {reducer, actions} = filterSlice;

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    changeFilter
    } = actions