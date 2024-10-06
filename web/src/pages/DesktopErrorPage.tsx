// import React from 'react';
import "../styles/page styles/ScreensizeError.css"

function ErrorPage() {
    return (
        <div className="error-page-container">
            <h1 className="error-title">SORRY!</h1>
            <p className="error-message">
                This page is only accessible on mobile devices.
            </p>
        </div>
    );
}

export default ErrorPage;