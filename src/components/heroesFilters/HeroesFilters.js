import { useSelector, useDispatch } from "react-redux";
import {changeFilter} from '../../actions';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import classNames from 'classnames';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    // console.log('filter render')
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch()
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