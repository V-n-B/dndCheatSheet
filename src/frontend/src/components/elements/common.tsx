import React from 'react';

export function ContentWrapper(props: { children: React.ReactNode }) {
    return (
        <div className="content-wrapper">
            {props.children}
        </div>
    );
}