import React from 'react';

const ScavBoxHeader = ({ handleOpenBox }) => {
    return (
        <div>
            <h1 className="title">Ouverture de la Boîte des Scavs</h1>
            <button className="button" onClick={handleOpenBox}>Ouvrir la Boîte</button>
        </div>
    );
}

export default ScavBoxHeader;