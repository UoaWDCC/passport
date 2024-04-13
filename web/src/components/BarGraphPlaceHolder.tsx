import styles from "./BarGraphPlaceHolder.module.css"


const BarGraphPlaceHolder = () => {
    return (
        <div className={styles.parent_container}>
            <div className={styles.bar_graph_placeholder}>
                <div className={styles.bar_graph}>
                    <div className={styles.bar}>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { BarGraphPlaceHolder };

