import { FunctionComponent } from "react";
import Image from 'next/image';

import styles from "../styles/SkillIcon.module.css";

export interface SkillIconProps {
    key: string;
    name?: string;  // name of skill.
    imageURL: string;
    url: string; // url to language / framework website.
    whiteBG?: boolean 
}

const SkillIcon: FunctionComponent<SkillIconProps> = (props) => {
    return (
        <div className={props.whiteBG ? styles.container__white : styles.container}>
            <a href={props.url} target="_blank" rel="noreferrer">
                <div className={styles.imagewrapper}>
                    <Image src={props.imageURL} layout="fill" alt={props.name ? props.name : ""}/>
                </div>
            </a>
        </div>
    )
}

export default SkillIcon;