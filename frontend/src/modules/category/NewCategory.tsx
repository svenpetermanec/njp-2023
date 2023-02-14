import Header from '../article/components/Header';
import { useForm } from 'react-hook-form';
import axios from '../../util/axios';
import { toast } from 'react-toastify';

const NewCategory = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const onSubmit = async (values: any) => {
        console.log(values.title);
        await axios.post('/category', { title: values.title });
        toast.success('Category created');
    };
    return (
        <>
            <Header />
            <div
                className="bg-gray-300 flex flex-col justify-center items-center p-2"
                style={{ height: '925px' }}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <input
                        type="text"
                        placeholder="title"
                        className="rounded-md p-2 w-full text-gray-400"
                        {...register('title', {
                            required: 'Title required',
                        })}
                    />
                    <>{errors.title && errors.title.message}</>
                    <br />
                    <button
                        type="submit"
                        className="bg-white w-full text-gray-400 p-2 rounded-md hover:bg-gray-200 hover:text-teal-500"
                    >
                        Create category
                    </button>
                </form>
            </div>
        </>
    );
};

export default NewCategory;
