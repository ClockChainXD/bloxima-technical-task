import styles from "./MintButton.module.css";

type MintButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const MintButton = (props: MintButtonProps) => {
    return <button className={styles.button} {...props}>Mint NFT</button>;
};

export default MintButton;
