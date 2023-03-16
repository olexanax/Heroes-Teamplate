import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}


const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state=>{state.heroesLoadingStatus = 'loading'},
        heroesFetched: (state, {payload}) => {
                    state.heroes = payload
                    state.heroesLoadingStatus = 'idle'
        },
        heroesFetchingError: state => {state.heroesLoadingStatus= 'error'},
        heroesAddNew: (state, {payload})=>{
            state.heroes.push(payload)
        },
        heroesDelete: (state, {payload})=>{
            state.heroes = state.heroes.filter(hero => hero.id !==payload)
        }
    }
})

const {actions, reducer} = heroesSlice;

export default reducer;
export const {
    heroesFetching, 
    heroesFetched,
    heroesFetchingError,
    heroesAddNew,
    heroesDelete} = actions