import React, { useEffect, useState } from 'react';
import NFTCard, { NFTCardProps } from '../NFTCard';
import styles from './NFTList.module.css';

export const NFTList: React.FC = () => {
    const [nfts, setNFTs] = useState<NFTCardProps[]>([]);
    const [dataSize, setDataSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const fetchNFTs =  async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:3000/nfts/?offset=0&data_size=${dataSize}`);
            const data = await response.json();
            setNFTs(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching NFTs:', error);
        }
    };

    useEffect(() => {        
        fetchNFTs();                                   
    }, [dataSize]);

    return (
        <div>
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
        <div className={styles.loadMoreContainer}>
        {isLoading && <button className={styles.loader}> </button>}
        {!isLoading   &&       <button className={styles.loadMoreButton} onClick={() => setDataSize(dataSize+10)}>Load More</button>}
                    </div>
        </div>

    );
};

export default NFTList;