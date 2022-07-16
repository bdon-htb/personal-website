import { FunctionComponent } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
import styles from "../styles/Navbar.module.css"

export interface NavItem {
    name: string;
    url: string;
}

export interface NavProps {
    items: NavItem[];
    activeSection: string;
}

const Navbar: FunctionComponent<NavProps> = (props) => {
    return (
        <div className={styles.container}>
            <ul>
                {props.items.map(({ name, url }) => (
                    <li key={uuidv4()}><Link href={url}><a className={props.activeSection === name ? styles["navlink--active"] : styles["navlink"]}>{name}</a></Link></li>
                ))}
            </ul>
        </div>
    );
}

export default Navbar;
