import React from 'react';

const ErrorPage = () => {
    return (
        <div className="flex flex-col h-screen justify-center items-center text-red-600">
            <h1 className="text-3xl font-bold">Error</h1>
            <p className="text-xl">This page is only accessible on mobile devices.</p>
        </div>
    );
};

export default ErrorPage;
