import React from 'react';
import "../styles/page styles/ScreensizeError.css"


function ErrorPage() {
    return (
        <div className="error-page-container">
            <h1 className="error-title">SORRY!</h1>
            <p className="error-message">
                This page is only accessible on desktop screens.
            </p>
        </div>
    );
}

export default ErrorPage;
