import { createSlice, createAsyncThunk, createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";


const heroesAdapter = createEntityAdapter()

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle',
})

// const initialState = {
//     heroes: [],
    // heroesLoadingStatus: 'idle',
// }

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async () => {
        const {request} = useHttp()
        return await request('https://json-server-vercel-main-six.vercel.app/heroes')
    },

)


const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesAddNew: (state, {payload})=>{
            heroesAdapter.addOne(state, payload)
        },
        heroesDelete: (state, {payload})=>{
            heroesAdapter.removeOne(state, payload)
        }
    },
    extraReducers:builder => {
        builder
            .addCase(fetchHeroes.pending,  state=>{state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, {payload}) => {
                state.heroesLoadingStatus = 'idle'
                heroesAdapter.setAll(state, payload)
            })
            .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus= 'error'})
            .addDefaultCase(()=>{})


    }
})

const {actions, reducer} = heroesSlice;

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes)

export const filteredHeroesSelector = createSelector(
    state => state.filters.activeFilter,
    selectAll,
    (activeFilter, heroes) => {
        if(activeFilter === 'all'){
            return heroes
        } else {
            return heroes.filter(hero => hero.element === activeFilter)
        }
    }
);
export default reducer;
export const {
    heroesAddNew,
    heroesDelete} = actions