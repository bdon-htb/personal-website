import { InferGetStaticPropsType, NextPage } from "next";
import Navbar, { NavItem } from "../components/Navbar";

export const getStaticProps = async () => {
    const projectSrc = "/aliza/index.html";
    const navItems: NavItem[] = [
        { name: "back to home", url: "/" },
    ]
    return {
        props: {
            projectSrc,
            navItems
        }
    }
}

const AlizaChatbotPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
    return (
        <>
            <header className="header">
                <nav>
                    <Navbar items={props.navItems} activeSection=""></Navbar>
                </nav>
            </header>
            <section className="accontainer">
                <iframe className="alizachatbot" src={props.projectSrc} frameBorder="0"></iframe>
            </section>
        </>
    )
}

export default AlizaChatbotPage;