import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {useHttp} from '../../hooks/http.hook';
import {useDispatch, useSelector} from "react-redux";
import {filtersFetched, filtersFetchingError, filtersFetching, heroesFetching, heroesFetched, heroesFetchingError} from '../../actions';
import { v4 as uuidv4 } from 'uuid';
import ErrorMessage from "../errorMessage/ErrorMessage";
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);
    const {request} = useHttp();
    const dispatch = useDispatch()

    useEffect(()=> {
        getFilters()
    // eslint-disable-next-line
    },[])

    const onSubmit = async data => {
        await request(`http://localhost:3001/heroes`, "POST",JSON.stringify({ ...data, id: uuidv4()}))
        await getHeroes()
    }
    
    const getFilters = () => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
    }
    const getHeroes = () => {
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
    }


    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Ім'я нового героя</label>
                <input 
                    {...register("name", { required: true })}
                    type="text" 
                    className="form-control" 
                    id="name" 
                    placeholder="Як мене звати?"/>
                    {errors.name && <ErrorMessage>This field is required</ErrorMessage>}
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Опис</label>
                <textarea
                    {...register("description", { required: true })}
                    className="form-control" 
                    id="text" 
                    placeholder="Що я вмію?"
                    style={{"height": '130px'}}/>
                    {errors.description && <ErrorMessage>This field is required</ErrorMessage>}
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Вибрати елемент героя</label>
                <select 
                    {...register("element", { required: true, validate: value => value !== "tool"})}
                    className="form-select" 
                    id="element">
                    <option value="tool">Я володію елементом...</option>
                    {filters.filter(item => item.value !=="all").map((item, i) => {
                        return <option key={i} value={item.value}>{item.text}</option>
                    })}
                </select>
                {errors.element && <ErrorMessage>This field is required</ErrorMessage>}
                {filtersLoadingStatus === 'error' && <ErrorMessage>request is failed</ErrorMessage>}
            </div>

            <button type="submit" className="btn btn-primary">Створити</button>
        </form>
    )
}

export default HeroesAddForm;