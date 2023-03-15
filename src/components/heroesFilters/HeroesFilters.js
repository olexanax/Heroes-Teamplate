import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {changeFilter, fetchFilters} from '../../actions';
import { useHttp } from "../../hooks/http.hook";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import classNames from 'classnames';


const HeroesFilters = () => {
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch()
    const {request} = useHttp();

    useEffect(()=>{
        getFilters()
    // eslint-disable-next-line
    },[])

    const getFilters = () => {
        dispatch(fetchFilters(request))
    }
     
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filtersLoadingStatus === 'error' && <ErrorMessage>request is failed</ErrorMessage>}
                    {filtersLoadingStatus === 'loading' && <Spinner/>}
                    {filters.map((item, i) => {
                        return <button 
                                    className={classNames(`btn btn-${item.type}`, {'active':activeFilter === item.value})}
                                    key={i}
                                    onClick={()=>dispatch(changeFilter(item.value))}>{item.text}</button>
                                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;