import { FunctionComponent, ReactNode } from "react";
import styles from "../styles/ToolTip.module.css";

export interface ToolTipProps {
    children: ReactNode | ReactNode[];
    text: string;
}

const ToolTip: FunctionComponent<ToolTipProps> = (props) => {
    return (
        <div className={styles.container}>
            <>{props.children}</>
            <span className={styles.text}>{props.text}</span>
        </div>
    )
}

export default ToolTip;