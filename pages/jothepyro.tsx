import type { InferGetStaticPropsType, NextPage } from 'next';
import React from 'react';

import type { NavItem } from '../components/Navbar';
import Navbar from '../components/Navbar';

export const getStaticProps = async () => {
    const projectSrc = "/jtp/index.html";
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

const JoThePyroPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
    return (
        <>
            <header className="header">
                <nav>
                    <Navbar items={props.navItems} activeSection=""></Navbar>
                </nav>
            </header>
            <section className="jtpcontainer">
                <iframe className="jothepyro" src={props.projectSrc} frameBorder="0" scrolling="no"></iframe>
            </section>
        </>
    )
}

export default JoThePyroPage;