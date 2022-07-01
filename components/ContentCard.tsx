import { FunctionComponent, ReactNode } from "react";
import styles from "../styles/ContentCard.module.css"

export interface ContentCardProps {
    children: ReactNode | ReactNode[];
}

const ContentCard: FunctionComponent<ContentCardProps> = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.container__background}></div>
            {/* <div className={styles.container__dropshadow}></div> */}
            <div className={styles.container__content}>
                {props.children}
            </div>
        </div>
    )
}

export default ContentCard;