import React from 'react';

const AuthLayout = ({ children }) => {
    return (
        <div className='min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4'>
            <div className='w-full max-w-md'>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
