import { createReducer } from "@reduxjs/toolkit"
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesAddNew,
    heroesDelete
} from './../actions'


const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

// const heroes = createReducer(initialState, {
//     [heroesFetching]: state=>{
//                     state.heroesLoadingStatus = 'loading'
//                 },
//     [heroesFetched]: (state, {payload}) => {
//                     state.heroes = payload
//                     state.heroesLoadingStatus = 'idle'
//                 },
//     [heroesFetchingError]: state => {
//                     state.heroesLoadingStatus= 'error'
//                 }},
//     [],
//     state => state)

const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state=>{
            state.heroesLoadingStatus = 'loading'
        })
        .addCase(heroesFetched, (state, {payload}) => {
            state.heroes = payload
            state.heroesLoadingStatus = 'idle'
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus= 'error'
        })
        .addCase(heroesAddNew, (state, {payload})=>{
            state.heroes.push(payload)
        })
        .addCase(heroesDelete, (state, {payload})=>{
            state.heroes = state.heroes.filter(hero => hero.id !==payload)
        })
        .addDefaultCase(() => {})
})


// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         // Delete functional 
//         // case 'DELETE':
//         //     const newList = [...state.heroes]
//         //     newList.splice(action.payload,1)
//         //     return {
//         //         ...state,
//         //         heroes: newList
//         //     }
//         default: return state
//     }
// }

export default heroes;
