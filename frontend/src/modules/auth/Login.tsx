import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from '../../util/axios';
import { useForm } from 'react-hook-form';

const Login = () => {
    const navigate = useNavigate();

    const onSubmit = async (values: any) => {
        const response = await axios.post('/auth/login', {
            username: values.username,
            password: values.password,
        });
        localStorage.setItem('jwt', response.data.token);
        console.log(response.data.token);
        navigate('/');
    };

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    if (localStorage.getItem('jwt')) return <Navigate to="/" />;

    return (
        <div className="flex flex-col h-screen w-screen justify-center items-center bg-gray-300">
            <div className="flex flex-col justify-center items-center bg-teal-500 px-5 p-3 rounded-md text-white space-y-5">
                <h1 className="text-xl">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <input
                        type="text"
                        placeholder="username"
                        className="rounded-md p-2 w-full text-gray-400"
                        {...register('username', {
                            required: 'Username required',
                        })}
                    />
                    <>{errors.username && errors.username.message}</>
                    <br />
                    <input
                        type="password"
                        placeholder="password"
                        className="rounded-md p-2 w-full text-gray-400"
                        {...register('password', {
                            required: 'Password required',
                        })}
                    />
                    <>{errors.password && errors.password.message}</>
                    <button
                        type="submit"
                        className="bg-white w-full text-gray-400 p-2 rounded-md hover:bg-gray-200 hover:text-teal-500"
                    >
                        Login
                    </button>
                </form>
                <Link to={'/register'}>Don't have an account?</Link>
            </div>
        </div>
    );
};

export default Login;
