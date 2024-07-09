import styles from "./MintButton.module.css";
import { BaseError, useWriteContract } from 'wagmi'
import abi from '../../abi.json';
import { useWaitForTransactionReceipt } from 'wagmi'
import toast from "react-hot-toast";

type MintButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;



const MintButton = (props: MintButtonProps) => {
    const { data: hash, writeContract, isPending, isError, error } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })
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
            {isPending && hash && <div>Transaction Hash: {hash}</div>}
            <button disabled={isPending}
            className={styles.colorfulButton} {...props} onClick={mintBloximaNFT}>
                {isPending || isConfirming ? 'Confirming...' : 'Mint Bloxima NFT'}
            </button>
            <button disabled={isPending} 
            className={styles.colorfulButton} {...props} onClick={mintCandidateNFT}>
                {isPending || isConfirming ? 'Confirming...' : 'Mint Candidate NFT'}
            </button>
            {isError && error && toast.error(`Error minting NFT: ${(error as BaseError).shortMessage}`)}
            {isPending && toast.loading('Waiting for confirmation...')}
            {isConfirmed && toast.success('NFT Minted!')}
        </div>
    )
};

export default MintButton;
