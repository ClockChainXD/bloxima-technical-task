import React from 'react';
import styles from './NFTCard.module.css';

export type NFTCardProps = {
    status: 'minted' | 'not minted';
    image: string;
    name: string;
};

const NFTCard: React.FC<NFTCardProps> = ({ status, image, name }) => {
    return (
        <div className={styles.container}>
            <h3>NFT Card</h3>
            <img src={image} alt={name} className={styles.image} />
            <p>Status: {status}</p>
            <p>Name: {name}</p>
        </div>
    );
};

export default NFTCard;