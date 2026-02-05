import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('patient');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            toast.success('Account created successfully!');
            navigate('/');
            window.location.reload();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration Failed');
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
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
                        </svg>
                    </div>
                    <h1 className='text-3xl font-bold text-slate-900 mb-2'>Create Account</h1>
                    <p className='text-slate-600'>Join DocBook and start your healthcare journey</p>
                </div>

                {/* Form */}
                <form onSubmit={onSubmitHandler} className='space-y-5'>
                    <div>
                        <label className='block text-sm font-semibold text-slate-700 mb-2'>Full Name</label>
                        <input
                            className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                            type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder='John Doe'
                            required
                        />
                    </div>

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

                    <div>
                        <label className='block text-sm font-semibold text-slate-700 mb-3'>I am a</label>
                        <div className='grid grid-cols-2 gap-4'>
                            <button
                                type='button'
                                onClick={() => setRole('patient')}
                                className={`p-4 rounded-lg border-2 transition-all ${role === 'patient'
                                        ? 'border-indigo-600 bg-indigo-50'
                                        : 'border-slate-300 hover:border-slate-400'
                                    }`}
                            >
                                <div className='text-2xl mb-2'>🧑‍⚕️</div>
                                <div className='font-semibold text-slate-900'>Patient</div>
                                <div className='text-xs text-slate-500 mt-1'>Book appointments</div>
                            </button>
                            <button
                                type='button'
                                onClick={() => setRole('doctor')}
                                className={`p-4 rounded-lg border-2 transition-all ${role === 'doctor'
                                        ? 'border-indigo-600 bg-indigo-50'
                                        : 'border-slate-300 hover:border-slate-400'
                                    }`}
                            >
                                <div className='text-2xl mb-2'>👨‍⚕️</div>
                                <div className='font-semibold text-slate-900'>Doctor</div>
                                <div className='text-xs text-slate-500 mt-1'>Manage patients</div>
                            </button>
                        </div>
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>

                    <div className='text-center pt-4'>
                        <p className='text-slate-600'>
                            Already have an account?{' '}
                            <span
                                onClick={() => navigate('/login')}
                                className='text-indigo-600 font-semibold hover:text-indigo-700 cursor-pointer'
                            >
                                Sign In
                            </span>
                        </p>
                    </div>
                </form>

                {/* Doctor Notice */}
                {role === 'doctor' && (
                    <div className='mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200'>
                        <p className='text-sm text-yellow-800 text-center'>
                            <span className='font-semibold'>Note:</span> Doctor accounts require admin approval
                        </p>
                    </div>
                )}
            </div>
        </AuthLayout>
    );
};

export default Register;
