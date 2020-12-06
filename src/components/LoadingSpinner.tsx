import React from "react";

export const LoadingSpinner: React.FC = () => {
    return (
        <div className='lds-ring'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};
