import styles from "./MintButton.module.css";
import { useWriteContract } from 'wagmi'
import abi from '../../abi.json';

type MintButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;



const MintButton = (props: MintButtonProps) => {
    const { data: hash, writeContract, isPending } = useWriteContract()
    async function mintBloximaNFT() {
        try {
            await writeContract({
                address: '0xa73655417dBD4C4ef0e878E7aC7245B197944979',
                abi,
                functionName: "mintNFT",
                args: [],
            })
        } catch (error) {
            console.log('Error minting NFT:', error);
        }
    
    }
    
    async function mintCandidateNFT() {
        try {
            await writeContract({
                address: '0x93a63a5301a20CE98c39Fd48FE513c2298B18A66',
                abi,
                functionName: "mintNFT",
                args: [],
            })
        } catch (error) {
            console.log('Error minting NFT:', error);
        }
    
    }
    return (
        <div>
            {hash && <div>Transaction Hash: {hash}</div>}
            <button disabled={isPending}
            className={styles.button} {...props} onClick={mintBloximaNFT}>
                {isPending ? 'Confirming...' : 'Mint Bloxima NFT'}
            </button>
            <button disabled={isPending} 
            className={styles.button} {...props} onClick={mintCandidateNFT}>
                {isPending ? 'Confirming...' : 'Mint Candidate NFT'}
            </button>
        </div>
    )
};

export default MintButton;
