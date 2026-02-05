import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            toast.success('Welcome back!');
            navigate('/');
            window.location.reload();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className='bg-white rounded-2xl shadow-sm p-8 border border-slate-200'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <div className='w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                        </svg>
                    </div>
                    <h1 className='text-3xl font-bold text-slate-900 mb-2'>Welcome Back</h1>
                    <p className='text-slate-600'>Sign in to continue to DocBook</p>
                </div>

                {/* Form */}
                <form onSubmit={onSubmitHandler} className='space-y-5'>
                    <div>
                        <label className='block text-sm font-semibold text-slate-700 mb-2'>Email Address</label>
                        <input
                            className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder='you@example.com'
                            required
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-semibold text-slate-700 mb-2'>Password</label>
                        <input
                            className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder='••••••••'
                            required
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className='text-center pt-4'>
                        <p className='text-slate-600'>
                            Don't have an account?{' '}
                            <span
                                onClick={() => navigate('/register')}
                                className='text-indigo-600 font-semibold hover:text-indigo-700 cursor-pointer'
                            >
                                Create Account
                            </span>
                        </p>
                    </div>
                </form>

                {/* Demo Info */}
                <div className='mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200'>
                    <p className='text-sm text-slate-600 text-center'>
                        <span className='font-semibold'>Demo:</span> patient@gmail.com / 123456
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Login;
