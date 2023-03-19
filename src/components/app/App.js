import { fetchFilters } from '../heroesFilters/FiltersSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';


import './app.scss';

const App = () => {
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(fetchFilters());
    })

    return (
        <main className="app">
            <div className="content">
                <HeroesList/>
                <div className="content__interactive">
                    <HeroesAddForm/>
                    <HeroesFilters/>
                </div>
            </div>
        </main>
    )
}

export default App;

