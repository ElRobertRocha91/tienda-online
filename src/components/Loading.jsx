import styles from "../styles/components/Loading.module.css";

function Loading() {
    return (
        <div className={styles.container}>
            <div className={styles.loader}></div>
            <p className={styles.message}>Loading...</p>
        </div>
    )
}

export default Loading;