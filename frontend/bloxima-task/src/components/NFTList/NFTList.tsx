import React, { useEffect, useState } from 'react';
import NFTCard, { NFTCardProps } from '../NFTCard';
import styles from './NFTList.module.css';

export const NFTList: React.FC = () => {
    const [nfts, setNFTs] = useState<NFTCardProps[]>([]);

    useEffect(() => {
        // Fetch NFTs here and update the state
        // For example:
        const fetchNFTs =  () => {
            try {
                //const response = await fetch('https://localhost:3000/nfts');
                //const data = await response.json();
                const data = [{ status: 'minted', image: 'https://via.placeholder.com/150', name: 'NFT 1' } as NFTCardProps, { status: 'not minted', image: 'https://via.placeholder.com/150', name: 'NFT 2' } as NFTCardProps  /* Add more NFTs here */]
                setNFTs(data);
            } catch (error) {
                console.error('Error fetching NFTs:', error);
            }
        };

        fetchNFTs();
    }, []);

    return (
        <div className={styles.container}>
            {nfts.map((nft, index) => (
                <NFTCard
                    key={index}
                    status={nft.status}
                    image={nft.image}
                    name={nft.name}
                />
            ))}
        </div>
    );
};

export default NFTList;