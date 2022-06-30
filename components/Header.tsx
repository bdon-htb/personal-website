import { FunctionComponent } from "react";
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
                        <li><a href={url}>{name}</a></li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default Header;