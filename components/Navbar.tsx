import { FunctionComponent } from "react";
import { v4 as uuidv4 } from 'uuid';
import styles from "../styles/Navbar.module.css"

export interface NavItem {
    name: string;
    url: string;
    active: boolean
}

export interface NavProps {
    items: NavItem[];
}

const Navbar: FunctionComponent<NavProps> = (props) => {
    return (
        <div className={styles.container}>
            <ul>
                {props.items.map(({ name, url }) => (
                    <li key={uuidv4()}><a href={url}>{name}</a></li>
                ))}
            </ul>
        </div>
    );
}

export default Navbar;
