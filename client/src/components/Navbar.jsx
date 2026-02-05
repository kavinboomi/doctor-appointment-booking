import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Container from './Container';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        const checkToken = () => {
            if (localStorage.getItem('token')) {
                setToken(true);
            } else {
                setToken(false);
            }
        };

        checkToken();
        window.addEventListener('storage', checkToken);

        return () => {
            window.removeEventListener('storage', checkToken);
        };
    }, [location]);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(false);
        navigate('/login');
        window.location.reload();
    }

    return (
        <nav className='sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200'>
            <Container>
                <div className='flex items-center justify-between py-4'>
                    {/* Logo */}
                    <div
                        onClick={() => navigate('/')}
                        className='flex items-center gap-2 cursor-pointer'
                    >
                        <div className='w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl'>
                            D
                        </div>
                        <span className='text-2xl font-bold text-slate-900'>
                            DocBook
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className='hidden md:flex items-center gap-8'>
                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                `font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to='/doctors'
                            className={({ isActive }) =>
                                `font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`
                            }
                        >
                            Doctors
                        </NavLink>
                        <NavLink
                            to='/about'
                            className={({ isActive }) =>
                                `font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`
                            }
                        >
                            About
                        </NavLink>
                        <NavLink
                            to='/contact'
                            className={({ isActive }) =>
                                `font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`
                            }
                        >
                            Contact
                        </NavLink>
                    </ul>

                    {/* Auth Section */}
                    <div className='flex items-center gap-4'>
                        {token ? (
                            <div className='relative group'>
                                <div className='flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors'>
                                    <div className='w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm'>
                                        {JSON.parse(localStorage.getItem('user') || '{}').name?.charAt(0) || 'U'}
                                    </div>
                                    <svg className='w-4 h-4 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                                    </svg>
                                </div>

                                {/* Dropdown */}
                                <div className='absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
                                    <div className='p-4 border-b border-slate-100'>
                                        <p className='font-semibold text-slate-900'>{JSON.parse(localStorage.getItem('user') || '{}').name || 'User'}</p>
                                        <p className='text-sm text-slate-500'>{JSON.parse(localStorage.getItem('user') || '{}').email || ''}</p>
                                    </div>
                                    <div className='p-2'>
                                        <button
                                            onClick={() => navigate('/my-profile')}
                                            className='w-full text-left px-4 py-2.5 rounded-md hover:bg-slate-50 text-slate-700 transition-colors'
                                        >
                                            My Profile
                                        </button>
                                        <button
                                            onClick={() => navigate('/my-appointments')}
                                            className='w-full text-left px-4 py-2.5 rounded-md hover:bg-slate-50 text-slate-700 transition-colors'
                                        >
                                            My Appointments
                                        </button>
                                        <button
                                            onClick={logout}
                                            className='w-full text-left px-4 py-2.5 rounded-md hover:bg-red-50 text-red-600 transition-colors'
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className='px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-colors'
                            >
                                Sign In
                            </button>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className='md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors'
                        >
                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {showMobileMenu && (
                    <div className='md:hidden py-4 border-t border-slate-200'>
                        <NavLink to='/' className='block py-3 text-slate-700 hover:text-indigo-600 font-medium' onClick={() => setShowMobileMenu(false)}>
                            Home
                        </NavLink>
                        <NavLink to='/doctors' className='block py-3 text-slate-700 hover:text-indigo-600 font-medium' onClick={() => setShowMobileMenu(false)}>
                            Doctors
                        </NavLink>
                        <NavLink to='/about' className='block py-3 text-slate-700 hover:text-indigo-600 font-medium' onClick={() => setShowMobileMenu(false)}>
                            About
                        </NavLink>
                        <NavLink to='/contact' className='block py-3 text-slate-700 hover:text-indigo-600 font-medium' onClick={() => setShowMobileMenu(false)}>
                            Contact
                        </NavLink>
                    </div>
                )}
            </Container>
        </nav>
    );
};

export default Navbar;
