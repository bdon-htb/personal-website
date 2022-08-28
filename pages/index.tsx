import { useState, useRef, useEffect } from 'react';
import type { InferGetStaticPropsType, NextPage } from 'next';
import Image  from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { useInView } from 'react-intersection-observer';

import ContentCard from '../components/ContentCard';
import type { NavItem } from '../components/Navbar';
import type { ProjectCardProps } from '../components/ProjectCard';

import profilePic from '../public/images/profile.jpg';
import ProjectCard from '../components/ProjectCard';
import Navbar from '../components/Navbar';
import SkillIcon, { SkillIconProps } from '../components/SkillIcon';

export const getStaticProps = async () => {
  const navItems: NavItem[] = [
    { name: "home", url: "#home" },
    { name: "skills", url: "#skills" },
    { name: "projects", url: "#projects" },
    { name: "contact", url: "#contact" },
  ];

  const projects: ProjectCardProps[] = [
    { key: uuidv4(), imageURL: "/images/project_covers/jothepyro_cover.png", previewURL: "/videos/jothepyro_preview.mp4", name: "Jo The Pyro", brief: "A game about fighting evil plants", demoURL: "/jothepyro", srcURL: "https://github.com/bdon-htb/jothepyro-js" },
    { key: uuidv4(), imageURL: "/images/project_covers/aliza_cover.png", previewURL: "/videos/alizachatbot_preview.mp4", name: "Aliza Chatbot", brief: "An interactive web chatbot", demoURL: "", srcURL: "https://github.com/bdon-htb/chatbot-js" },
    { key: uuidv4(), imageURL: "/images/project_covers/damontower_cover.png", previewURL: "/videos/damontower_preview.mp4", name: "Damon\'s Tower", brief: "An (unfinished) game engine + roguelite", demoURL: "", srcURL: "https://github.com/bdon-htb/damons-tower" },
    { key: uuidv4(), imageURL: "/images/project_covers/ezbudget_cover.png", previewURL: "/videos/ezbudget_preview.mp4", name: "EzBudget", brief: "A basic budgeting application", demoURL: "", srcURL: "https://github.com/bdon-htb/python-ezbudget" },
    { key: uuidv4(), imageURL: "/images/project_covers/richardbot_cover.png", previewURL: "/videos/richardbot_preview.mp4", name: "Richard Bot", brief: "A simple discord bot for personal use", demoURL: "", srcURL: "https://github.com/bdon-htb/richard_bot" }
  ];

  const skills: SkillIconProps[] = [
    { key: uuidv4(), imageURL: "/images/skills_icons/c_lang.svg", url: "https://en.wikipedia.org/wiki/C_(programming_language)"},
    { key: uuidv4(), imageURL: "/images/skills_icons/java.svg", url: "https://www.oracle.com/java/" },
    { key: uuidv4(), imageURL: "/images/skills_icons/python.svg", url: "https://www.python.org/" },
    { key: uuidv4(), imageURL: "/images/skills_icons/javascript.svg", url: "https://en.wikipedia.org/wiki/JavaScript" },
    { key: uuidv4(), imageURL: "/images/skills_icons/typescript.svg", url: "https://www.typescriptlang.org/" },
    { key: uuidv4(), imageURL: "/images/skills_icons/html.svg", url: "https://en.wikipedia.org/wiki/HTML" },
    { key: uuidv4(), imageURL: "/images/skills_icons/css.svg", url: "https://en.wikipedia.org/wiki/CSS" },
    { key: uuidv4(), imageURL: "/images/skills_icons/nextjs.svg", url: "https://nextjs.org/" },
    { key: uuidv4(), imageURL: "/images/skills_icons/git.svg", url: "https://git-scm.com/" },
    { key: uuidv4(), imageURL: "/images/skills_icons/linux.svg", url: "https://en.wikipedia.org/wiki/Linux" },
    { key: uuidv4(), imageURL: "/images/skills_icons/bash.svg", url: "https://www.gnu.org/software/bash/" },
    { key: uuidv4(), imageURL: "/images/skills_icons/vscode.svg", url: "https://code.visualstudio.com/" },
  ];

  return {
    props: {
      navItems,
      projects,
      skills
    }
  }
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {

  const updateActive = () => {
    let views: { [key: string]: boolean } = {
      "home": homeInView,
      "skills": skillsInView,
      "projects": projectsInView,
      "contact": contactInView
    }

    let last: NavItem | null = null;
    for (const item of props.navItems) {
      if (views[item.name]) { // If view is visible...
        last = item;
      }
    }

    if (last) {
      if (last.name != activeSection) {
        setActiveSection(last.name);
      }
    }
  }

  const [activeSection, setActiveSection] = useState("home");

  const [homeRef, homeInView] = useInView({
    initialInView: true,
    threshold: 0.8,
  });
  const [skillsRef, skillsInView] = useInView({
    threshold: 0.8,
  });
  const [projectsRef, projectsInView] = useInView({
    threshold: 0.8,
  });
  const [contactRef, contactInView] = useInView({
    threshold: 0.8,
  });

  useEffect(updateActive, [homeInView, skillsInView, projectsInView, contactInView]);
  
  return (
    <>
      <header className="header">
        <nav>
          <Navbar items={props.navItems} activeSection={activeSection}></Navbar>
        </nav>
      </header>

      <section id="home" ref={homeRef}>
        <ContentCard>
            <div className="hccontainer">
              <div className="hcctext">
                <h1>Brandon Phillips</h1>
                <h2>Software developer by day, hobby artist by night.</h2>
                <p>
                  Welcome to my personal website.<br></br>
                  Keep scrolling to see a list of my skills,<br></br>some personal projects, and how to contact me.<br></br>
                </p>
              </div>
              <div className="profilepic__wrapper">
                <Image 
                  className="profilepic" 
                  src={profilePic} placeholder="blur"
                  />
              </div>
            </div>
        </ContentCard>
      </section>

      <section id="skills" ref={skillsRef}>
        <ContentCard>
          <div className="sccontainer">
            <div className="scctext">
              <h1>Skills</h1>
              <p>
                Below is a list of programming languages, frameworks, and environments I have experience with.
              </p> 
            </div>           
            <div className="skillslist">
              {props.skills.map( s => (
                <SkillIcon {...s}></SkillIcon>
              ))}
            </div>
          </div>
        </ContentCard>
      </section>

      <section id="projects" ref={projectsRef}>
        <ContentCard>
          <div className="pccontainer">
            <div className="pcctext">
              <h1>Projects</h1>
              <p>Here are some personal projects of mine.</p>
            </div>
            <div className="projectslist">
              {props.projects.map( p => (
                <ProjectCard {...p}></ProjectCard>
              ))}
            </div>
          </div>
        </ContentCard>
      </section> 

      <section id="contact" ref={contactRef}>
        <ContentCard>
          <h1>CONTACT</h1>
          <p>
            Yoooooooo!
          </p>
        </ContentCard>
      </section>      
    </>
  )
}

export default Home
