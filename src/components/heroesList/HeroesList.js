import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import {heroesDelete, fetchHeroes, filteredHeroesSelector} from './heroesSlice'
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './HeroesList.scss'


const HeroesList = () => {
    // console.log('render list')
    const filteredHeroes = useSelector(filteredHeroesSelector)
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        getHeroes()
    // eslint-disable-next-line
    }, []);

    const getHeroes = () => {
        dispatch(fetchHeroes())
    }  

    const onDelete = useCallback(id => {
        request(`https://json-server-vercel-main-six.vercel.app/heroes/${id}`, "DELETE")
            .then(dispatch(heroesDelete(id)))
            .catch(err => console.log(err));
        // eslint-disable-next-line 
    }, [])

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

