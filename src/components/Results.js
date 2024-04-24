import React from 'react';

const Results = ({ items }) => {
    return (
        <div>
            <h2>Résultats de l'ouverture</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default Results;