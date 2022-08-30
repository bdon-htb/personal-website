import { FunctionComponent } from "react";
import Link from "next/link";
import Image from 'next/image';

import styles from "../styles/ProjectCard.module.css";
import ProjectCardDisplay from "./ProjectCardDisplay";
import ToolTip from "./Tooltip";

export interface ProjectCardProps {
    key: string;
    imageURL: string;
    previewURL: string;
    name: string; // name of project.
    brief: string; // brief description of project.
    demoURL: string | null; // link to a live demo page (if it exists).
    srcURL: string | null; // link to source code (if it exists).
}

const ProjectCard: FunctionComponent<ProjectCardProps> = (props) => {
    return (
        <div className={styles.container}>
            <ProjectCardDisplay imageURL={props.imageURL} previewURL={props.previewURL}></ProjectCardDisplay>
            <div className={styles.infocontainer}>
                <h1 className={styles.name}>{props.name}</h1>
                <p className={styles.brief}>{props.brief}</p>
                <div className={styles.btncontainer}>
                    {props.demoURL ?
                    <span className={styles.demolink__wrapper}>
                        <ToolTip text="Play live demo">
                            <Link href={props.demoURL}><a className={styles.projectlink}><Image src="/images/gamepad.svg" layout="fill" alt=""/></a></Link>
                        </ToolTip>
                    </span> : null}
                    {props.srcURL ? 
                    <ToolTip text="See source code">
                        <a className={styles.projectlink} href={props.srcURL} target="_blank" rel="noreferrer"><Image src="/images/github.svg" layout="fill" alt=""/></a>
                    </ToolTip>: null}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;