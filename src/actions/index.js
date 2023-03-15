import { createAction } from "@reduxjs/toolkit"


export const fetchHeroes = (request) => dispatch => {
    request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
}

export const heroesFetching = createAction('HEROES_FETCHING')
export const heroesFetched = createAction('HEROES_FETCHED')
export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR')
export const heroesAddNew = createAction('HEROES_ADD_NEW')
export const heroesDelete = createAction('HEROES_DELETE')


// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const fetchFilters = request => dispatch => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const changeFilter = (value) => {
    return {
        type: 'FILTER_CHANGE',
        payload: value
    }
}

export const deleteItem = index => {
    return {
        type: 'DELETE',
        payload: index
    }
}