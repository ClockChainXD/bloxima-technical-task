import React from 'react';

export type NFTCardProps = {
    status: 'minted' | 'not minted';
    image: string;
    name: string;
};

const NFTCard: React.FC<NFTCardProps> = ({ status, image, name }) => {
    return (
        <div className="nft-card" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h3>NFT Card</h3>
            <img src={image} alt={name} style={{ width: '100%', marginBottom: '10px' }} />
            <p>Status: {status}</p>
            <p>Name: {name}</p>
        </div>
    );
};

export default NFTCard;