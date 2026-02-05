import React from 'react';

const Container = ({ children, className = '' }) => {
    return (
        <div className={`max-w-7xl mx-auto px-4 md:px-8 lg:px-16 ${className}`}>
            {children}
        </div>
    );
};

export default Container;
