import { V4MAPPED } from "dns";
import { FunctionComponent } from "react";
import { v4 as uuidv4 } from 'uuid';
import styles from "../styles/Header.module.css"

export interface NavItem {
    name: string;
    url: string;
    active: boolean
}

export interface HeaderProps {
    items: NavItem[];
}

const Header: FunctionComponent<HeaderProps> = (props) => {
    return (
        <header className={styles.header}>
            <nav className={styles.navmenu}>
                <ul>             
                    {props.items.map(({ name, url }) => (
                        <li key={uuidv4()}><a href={url}>{name}</a></li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default Header;