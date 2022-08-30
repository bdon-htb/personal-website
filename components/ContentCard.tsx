import { FunctionComponent, ReactNode } from "react";
import styles from "../styles/ContentCard.module.css";

export interface ContentCardProps {
    children: ReactNode | ReactNode[];
    altBG?: boolean;
}

const ContentCard: FunctionComponent<ContentCardProps> = (props) => {
    return (
        <div className={styles.container}>
            <div className={props.altBG ? styles.container__background__alt : styles.container__background}></div>
            <div className={styles.container__content}>
                {props.children}
            </div>
        </div>
    )
}

export default ContentCard;