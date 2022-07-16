import { useState, useRef, useEffect } from 'react';
import type { InferGetStaticPropsType, NextPage } from 'next'
import Image  from 'next/image'
import { v4 as uuidv4 } from 'uuid';
import { useInView } from 'react-intersection-observer';

import ContentCard from '../components/ContentCard'
import type { NavItem } from '../components/Navbar'
import type { ProjectCardProps } from '../components/ProjectCard'

import profilePic from '../public/images/profile.jpg'
import ProjectCard from '../components/ProjectCard'
import Navbar from '../components/Navbar';

export const getStaticProps = async () => {
  const navItems: NavItem[] = [
    { name: "home", url: "#home" },
    { name: "skills", url: "#skills" },
    { name: "projects", url: "#projects" },
    { name: "contact", url: "#contact" },
  ];

  const projects: ProjectCardProps[] = [
    { key: uuidv4(), imageURL: "/images/jothepyro_cover.png", previewURL: "/videos/jothepyro_preview.mp4", name: "Jo The Pyro", brief: "A game about fighting evil plants", demoURL: "https://bdon-htb.github.io/", srcURL: "https://github.com/bdon-htb/jothepyro-js" },
    { key: uuidv4(), imageURL: "/images/aliza_cover.png", previewURL: "/videos/alizachatbot_preview.mp4", name: "Aliza Chatbot", brief: "An interactive web chatbot", demoURL: "", srcURL: "https://github.com/bdon-htb/chatbot-js" },
    { key: uuidv4(), imageURL: "/images/damontower_cover.png", previewURL: "/videos/damontower_preview.mp4", name: "Damon\'s Tower", brief: "An (unfinished) game engine + roguelite", demoURL: "", srcURL: "https://github.com/bdon-htb/damons-tower" },
    { key: uuidv4(), imageURL: "/images/ezbudget_cover.png", previewURL: "/videos/ezbudget_preview.mp4", name: "EzBudget", brief: "A basic budgeting application", demoURL: "", srcURL: "https://github.com/bdon-htb/python-ezbudget" },
    { key: uuidv4(), imageURL: "/images/richardbot_cover.png", previewURL: "/videos/richardbot_preview.mp4", name: "Richard Bot", brief: "A simple discord bot for personal use", demoURL: "", srcURL: "https://github.com/bdon-htb/richard_bot" }
  ];

  return {
    props: {
      navItems,
      projects
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
              <div>
                <h1>BRANDON PHILLIPS</h1>
                <h2>(not to be confused with Brandon Phillips, the baseball player)</h2>
                <p>
                  Hello.<br></br>
                  I am a software developer and hobbyist artist. Keep scrolling
                  to see my skills and projects.
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
          <h1>SKILLS</h1>
          <p>
            Yooooooo!
          </p>
        </ContentCard>
      </section>

      <section id="projects" ref={projectsRef}>
        <ContentCard>
          <div className="pccontainer">
            <p>Here are some of my projects</p>
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
