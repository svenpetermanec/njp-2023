import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../util/axios';
import { useForm } from 'react-hook-form';

const Register = () => {
    const onSubmit = async (value: any) => {
        await axios.post('/auth/register', {
            username: value.username,
            email: value.email,
            password: value.password,
            isAdmin: false,
        });
        toast.success('Account created');
        return;
    };

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    return (
        <div className="flex flex-col h-screen w-screen justify-center items-center bg-gray-300">
            <div className="flex flex-col justify-center items-center bg-teal-500 px-5 p-3 rounded-md text-white space-y-5">
                <h1 className="text-xl">Register</h1>
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
                        type="email"
                        placeholder="email"
                        className="rounded-md p-2 w-full text-gray-400"
                        {...register('email', {
                            required: 'Email required',
                        })}
                    />
                    <>{errors.email && errors.email.message}</>
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
                        Create account
                    </button>
                </form>
                <Link to={'/login'}>Back to login</Link>
            </div>
        </div>
    );
};

export default Register;
