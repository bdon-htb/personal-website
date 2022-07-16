import { FunctionComponent } from "react";

import styles from "../styles/ProjectCard.module.css"
import ProjectCardDisplay from "./ProjectCardDisplay";

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
                    {props.demoURL ? <a className={styles.demolink} href={props.demoURL} target="_blank"><img src="/images/gamepad.svg"/></a>: null}
                    {props.srcURL ? <a className={styles.srclink} href={props.srcURL} target="_blank"><img src="/images/github.svg"/></a>: null}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;