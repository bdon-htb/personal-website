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
    const fadeTime = 1000; // ms

    const videoRef = createRef<HTMLVideoElement>();

    const [videoClass, setVideoClass] = useState(styles.hidden);
    const [imgClass, setImgClass] = useState(styles.active);
    const [videoTimeout, setVideoTimeout] = useState <ReturnType<typeof setTimeout> | null>(null);

    const startVideo = () => {
        if (videoRef.current) {
            if (videoTimeout !== null) {
                clearTimeout(videoTimeout);
            }
            setVideoTimeout(null);
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }          
    }
    
    const resetVideo = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.pause();
        }        
    }
    const stopVideo = () => {
        if (videoRef.current) {
            if (videoTimeout) {
                clearTimeout(videoTimeout);
            }
            setVideoTimeout(setTimeout(resetVideo, fadeTime));
        }        
    }


    const mouseHandler = (enter: boolean) => {
        if (enter) {
            setVideoClass(styles.active);
            setImgClass(styles.hidden);
            startVideo()
        }
        else {
            setVideoClass(styles.hidden);
            setImgClass(styles.active);
            stopVideo()
        }
    }

    return (
        <div className={styles.container} onMouseEnter={() => mouseHandler(true)} onMouseLeave={() => mouseHandler(false)}>
            <video ref={videoRef} className={videoClass} width={width} height={height} loop muted>
                <source src={props.previewURL} type="video/mp4"/>
            </video>
            <div className={imgClass}>
                <Image src={props.imageURL} width={width} height={height} layout="fixed" alt=""/>
            </div>
        </div>
    )
}

export default ProjectCardDisplay;