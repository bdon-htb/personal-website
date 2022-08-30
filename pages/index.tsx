import { useState, useRef, useEffect } from 'react';
import type { InferGetStaticPropsType, NextPage } from 'next';
import Image  from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { useInView } from 'react-intersection-observer';

import ContentCard from '../components/ContentCard';
import type { NavItem } from '../components/Navbar';
import type { ProjectCardProps } from '../components/ProjectCard';

import profilePic from '../public/images/profilepic.png';
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
    { key: uuidv4(), imageURL: "/images/project_covers/aliza_cover.png", previewURL: "/videos/alizachatbot_preview.mp4", name: "Aliza Chatbot", brief: "An interactive web chatbot", demoURL: "/aliza", srcURL: "https://github.com/bdon-htb/chatbot-js" },
    { key: uuidv4(), imageURL: "/images/project_covers/damontower_cover.png", previewURL: "/videos/damontower_preview.mp4", name: "Damon\'s Tower", brief: "An (unfinished) game engine + roguelite", demoURL: "", srcURL: "https://github.com/bdon-htb/damons-tower" },
    { key: uuidv4(), imageURL: "/images/project_covers/ezbudget_cover.png", previewURL: "/videos/ezbudget_preview.mp4", name: "EzBudget", brief: "A basic budgeting application", demoURL: "", srcURL: "https://github.com/bdon-htb/python-ezbudget" },
    { key: uuidv4(), imageURL: "/images/project_covers/richardbot_cover.png", previewURL: "/videos/richardbot_preview.mp4", name: "Richard Bot", brief: "A simple discord bot for personal use", demoURL: "", srcURL: "https://github.com/bdon-htb/richard_bot" }
  ];

  const skills: SkillIconProps[] = [
    { key: uuidv4(), name: "C", imageURL: "/images/skills_icons/c_lang.svg", url: "https://en.wikipedia.org/wiki/C_(programming_language)"},
    { key: uuidv4(), name: "Java", imageURL: "/images/skills_icons/java.svg", url: "https://www.oracle.com/java/"},
    { key: uuidv4(), name: "Python", imageURL: "/images/skills_icons/python.svg", url: "https://www.python.org/" },
    { key: uuidv4(), name: "Javascript", imageURL: "/images/skills_icons/javascript.svg", url: "https://en.wikipedia.org/wiki/JavaScript" },
    { key: uuidv4(), name: "Typescript", imageURL: "/images/skills_icons/typescript.svg", url: "https://www.typescriptlang.org/" },
    { key: uuidv4(), name: "HTML", imageURL: "/images/skills_icons/html.svg", url: "https://en.wikipedia.org/wiki/HTML" },
    { key: uuidv4(), name: "CSS", imageURL: "/images/skills_icons/css.svg", url: "https://en.wikipedia.org/wiki/CSS" },
    { key: uuidv4(), name: "Nextjs", imageURL: "/images/skills_icons/nextjs.svg", url: "https://nextjs.org/", whiteBG: true },
    { key: uuidv4(), name: "Git", imageURL: "/images/skills_icons/git.svg", url: "https://git-scm.com/" },
    { key: uuidv4(), name: "Linux", imageURL: "/images/skills_icons/linux.svg", url: "https://en.wikipedia.org/wiki/Linux" },
    { key: uuidv4(), name: "Bash", imageURL: "/images/skills_icons/bash.svg", url: "https://www.gnu.org/software/bash/" },
    { key: uuidv4(), name: "VSCode", imageURL: "/images/skills_icons/vscode.svg", url: "https://code.visualstudio.com/" },
  ];

  const contacts: SkillIconProps[] = [
    { key: uuidv4(), imageURL: "/images/gmail.svg", url: "mailto:brandonjphillips000@gmail.com"},
    { key: uuidv4(), imageURL: "/images/linkedin.svg", url: "https://www.linkedin.com/in/brandon-phillips-a885b824a/"},
    { key: uuidv4(), imageURL: "/images/github.svg", url: "https://github.com/bdon-htb"},
    { key: uuidv4(), imageURL: "/images/devpost.svg", url: "https://devpost.com/bdon-htb"},
  ];

  return {
    props: {
      navItems,
      projects,
      skills,
      contacts
    }
  }
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {

  const [activeSection, setActiveSection] = useState("home");

  // const updateActive = () => {
  //   let views: { [key: string]: boolean } = {
  //     "home": homeInView,
  //     "skills": skillsInView,
  //     "projects": projectsInView,
  //     "contact": contactInView
  //   }

  //   let last: NavItem | null = null;
  //   for (const item of props.navItems) {
  //     if (views[item.name]) { // If view is visible...
  //       last = item;
  //     }
  //   }

  //   if (last) {
  //     if (last.name != activeSection) {
  //       setActiveSection(last.name);
  //     }
  //   }
  // }

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

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeInView, skillsInView, projectsInView, contactInView]);
  
  return (
    <>
      <header>
        <nav>
          <Navbar items={props.navItems} activeSection={activeSection}></Navbar>
        </nav>
      </header>
      
      <section id="home" ref={homeRef}>
        <ContentCard>
            <div className="hccontainer">
              <div className="hcctext">
                <h1 className="heading1">Brandon Phillips</h1>
                <h2>Software developer by day, hobby artist by night.</h2>
                <p>
                  Welcome to my website. Keep scrolling to see a list of my skills, some personal projects, and how to contact me.
                </p>
              </div>
              <div className="profilepic__wrapper">
                <Image 
                  className="profilepic" 
                  src={profilePic} placeholder="blur"
                  alt="portrait photo of Brandon Phillips"
                  />
              </div>
            </div>
        </ContentCard>
      </section>

      <section id="skills" ref={skillsRef}>
        <ContentCard altBG={true}>
          <div className="sccontainer">
            <div className="sctext">
              <h1 className="heading1__alt">Skills</h1>
              <p>
                Below is a list of programming languages, frameworks, and environments I have experience with.
              </p> 
            </div>           
            <ul className="skillslist">
              {props.skills.map( s => (
                <li key={s.key}>
                  <SkillIcon {...s}></SkillIcon>
                </li>
              ))}
            </ul>
          </div>
        </ContentCard>
      </section>

      <section id="projects" ref={projectsRef}>
        <ContentCard>
          <div className="pccontainer">
            <div className="pctext">
              <h1 className="heading1">Projects</h1>
              <p>Here are some personal projects of mine.</p>
            </div>
            <ul className="projectslist">
              {props.projects.map( p => (
                <li key={p.key}>
                <ProjectCard {...p}></ProjectCard>
                </li>
              ))}
            </ul>
          </div>
        </ContentCard>
      </section> 

      <section id="contact" ref={contactRef}>
        <ContentCard altBG={true}>
          <div className="cccontainer">
            <div className="cctext">
              <h1 className="heading1__alt">Contact</h1>
              <p>Here are my socials if you want to get in touch!</p>
            </div>
            <ul className="contactlist">
              {props.contacts.map( c => (
                <li key={c.key}>
                  <SkillIcon {...c}></SkillIcon>
                </li>
              ))}
            </ul>
          </div>
        </ContentCard>
      </section>

      <footer className="footer">
        <p>© 2022 Brandon Phillips</p>
        <p>Website wallpaper by John Towner on Unsplash </p>
      </footer>  
    </>
  )
}

export default Home
