import { FunctionComponent } from "react";
import Image from 'next/image';

import styles from "../styles/SkillIcon.module.css";

export interface SkillIconProps {
    key: string;
    imageURL: string;
    url: string; // url to language / framework website.
}

const SkillIcon: FunctionComponent<SkillIconProps> = (props) => {
    return (
        <div className={styles.container}>
            <a className="" href={props.url} target="_blank"><Image src={props.imageURL} layout="fill"/></a>
        </div>
    )
}

export default SkillIcon;