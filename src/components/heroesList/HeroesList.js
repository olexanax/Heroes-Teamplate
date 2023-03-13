import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import { createSelector } from 'reselect'
        // eslint-disable-next-line 
import { heroesFetching, heroesFetched, heroesFetchingError, deleteItem } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './HeroesList.scss'

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const filteredHeroesSelector = createSelector(
        state => state.filters.activeFilter,
        state => state.heroes.heroes,
        (activeFilter, heroes) => {
            if(activeFilter === 'all'){
                return heroes
            } else {
                return heroes.filter(hero => hero.element === activeFilter)
            }
        }
    );

    const filteredHeroes = useSelector(filteredHeroesSelector)
    const {heroesLoadingStatus} = useSelector(state => state.heroes);
    // const filteredHeroes = useSelector(state => {
    //     console.log('render')
    //     if(state.filters.activeFilter === 'all'){
    //         return state.heroes.heroes
    //     } else {
    //         return state.heroes.heroes.filter(hero => hero.element === state.filters.activeFilter)
    //     }
    // })
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        getHeroes()
    // eslint-disable-next-line
    }, []);

    const onDelete = useCallback(async id => {
        //ручне видалення з стору
        // const index = heroes.findIndex(item => item.id === id)
        // dispatch(deleteItem(index))

        //видаляємо і робимо новий запит
        await request(`http://localhost:3001/heroes/${id}`, "DELETE")
        await getHeroes()
        // eslint-disable-next-line 
    }, [])

    const getHeroes = () => {
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
    }  

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        return arr?.map(({id, ...props}) => {
            return (
                <CSSTransition classNames='item' timeout={300} key={id}>
                    <HeroesListItem onDelete={onDelete} id={id} {...props}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);

    return (<>
            <ul>
                <TransitionGroup component={null}>
                    {elements}
                </TransitionGroup>
                {elements.length === 0 && <li><h5 className="text-center mt-5">Героев пока нет</h5></li>}   
            </ul>
            </>
    )
}

export default HeroesList;