import { useEffect} from "react";
import { useForm } from "react-hook-form";
import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector} from "react-redux";
import { fetchFilters, selectAll} from "../heroesFilters/FiltersSlice";
import { heroesAddNew} from '../heroesList/heroesSlice';
import { v4 as uuidv4 } from 'uuid';
import ErrorMessage from "../errorMessage/ErrorMessage";

const HeroesAddForm = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting}, reset} = useForm();
    const filters = useSelector(selectAll);
    const filtersLoadingStatus = useSelector(state => state.filters.filtersLoadingStatus);
    const {request} = useHttp();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchFilters());
    }, []);

    const onSubmit = data => {
        request(`http://localhost:3001/heroes`, "POST",JSON.stringify({ ...data, id: uuidv4()}))
            .then(data=>dispatch(heroesAddNew(data)))
            .catch(err => console.log(err));
            reset()

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
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
    {isSubmitting ? 'loading...' : 'Створити'}
</button>        </form>
    );
};

export default HeroesAddForm;
