import { createRef, FunctionComponent, useState } from "react";
import Image from 'next/image'

import styles from "../styles/ProjectCardDisplay.module.css"

export interface ProjectCardDisplayProps {
    imageURL: string; // link to display image
    previewURL: string; // link to display video
}

const ProjectCardDisplay: FunctionComponent<ProjectCardDisplayProps> = (props) => {
    const width = "200";
    const height = "300";

    const videoRef = createRef<HTMLVideoElement>();
    const [videoClass, setVideoClass] = useState(styles.hidden);
    const [imgClass, setImgClass] = useState(styles.active);

    const mouseHandler = (enter: boolean) => {
        if (enter) {
            setVideoClass(styles.active);
            setImgClass(styles.hidden);
            if (videoRef.current) {
                videoRef.current.play();
            }            
        }
        else {
            setVideoClass(styles.hidden);
            setImgClass(styles.active);
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }

    console.log(props.previewURL);
    return (
        <div onMouseEnter={() => mouseHandler(true)} onMouseLeave={() => mouseHandler(false)}>
            <video ref={videoRef} className={videoClass} width={width} height={height} loop muted>
                <source src={props.previewURL} type="video/mp4"/>
            </video>
            <div className={imgClass}>
                <Image src={props.imageURL} width={width} height={height}/>
            </div>
        </div>
    )
}

export default ProjectCardDisplay;