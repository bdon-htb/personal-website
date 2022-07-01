import { FunctionComponent } from "react";

import styles from "../styles/ProjectCard.module.css"
import ProjectCardDisplay from "./ProjectCardDisplay";

export interface ProjectCardProps {
    key: string;
    imageURL: string;
    previewURL: string;
    name: string; // name of project.
    demoURL: string | null; // link to a live demo page (if it exists).
    srcURL: string | null; // link to source code (if it exists).
}

const ProjectCard: FunctionComponent<ProjectCardProps> = (props) => {
    return (
        <div className={styles.container}>
            <ProjectCardDisplay imageURL={props.imageURL} previewURL={props.previewURL}></ProjectCardDisplay>
            <h1>{props.name}</h1>
            <div className={styles.btncontainer}>
                {props.demoURL ? <button className={styles.demoBtn}></button> : null}
                {props.srcURL ? <button className={styles.srcBtn}></button> : null}
            </div>
        </div>
    )
}

export default ProjectCard;