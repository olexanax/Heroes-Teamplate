const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroes = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        // Delete functional 
        // case 'DELETE':
        //     const newList = [...state.heroes]
        //     newList.splice(action.payload,1)
        //     return {
        //         ...state,
        //         heroes: newList
        //     }
        default: return state
    }
}

export default heroes;