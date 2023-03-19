import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {changeFilter, fetchFilters, selectAll} from './FiltersSlice'
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import classNames from 'classnames';


const HeroesFilters = () => {
    console.log('render filters')
    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const filters = useSelector(selectAll)
    const dispatch = useDispatch()


    useEffect(()=>{
         dispatch(fetchFilters())
    // eslint-disable-next-line
    },[])
     
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters.map((item, i) => {
                        return <button 
                            className={classNames(`btn btn-${item.type}`, {'active':activeFilter === item.value})}
                            key={i}
                            onClick={()=>dispatch(changeFilter(item.value))}>{item.text}</button>
                            })
                    }
                </div>
                {filtersLoadingStatus === 'error' && <ErrorMessage/>}
                {filtersLoadingStatus === 'loading' && <Spinner/>}
            </div>
        </div>
    )
}

export default HeroesFilters;