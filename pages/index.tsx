import type { InferGetStaticPropsType, NextPage } from 'next'
import Image  from 'next/image'
import { v4 as uuidv4 } from 'uuid';

import ContentCard from '../components/ContentCard'
import type { NavItem } from '../components/Navbar'
import type { ProjectCardProps } from '../components/ProjectCard'

import profilePic from '../public/images/profile.jpg'
import ProjectCard from '../components/ProjectCard'
import Navbar from '../components/Navbar';

export const getStaticProps = async () => {
  const navItems: NavItem[] = [
    { name: 'home', url: '#home', active: false },
    { name: 'skills', url: '#skills', active: false },
    { name: 'projects', url: '#projects', active: false },
    { name: 'contact', url: '#contact', active: true },
  ];

  const projects: ProjectCardProps[] = [
    { key: uuidv4(), imageURL: '/images/profile.jpg', previewURL: '/videos/jothepyro_preview.mp4', name: 'Jo The Pyro', demoURL: 'https://bdon-htb.github.io/', srcURL: 'https://github.com/bdon-htb/jothepyro-js' }
  ];

  return {
    props: {
      navItems,
      projects
    }
  }
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  return (
    <>
      <header className="header">
        <nav>
          <Navbar items={props.navItems}></Navbar>
        </nav>
      </header>

      <section id="home">
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

      <section id="skills">
        <ContentCard>
          <h1>SKILLS</h1>
          <p>
            Yooooooo!
          </p>
        </ContentCard>
      </section>

      <section id="projects">
        <ContentCard>
          <div className="pccontainer">
            <p>Here are some of my projects</p>
            {props.projects.map( p => (
              <ProjectCard {...p}></ProjectCard>
            ))}
          </div>
        </ContentCard>
      </section> 

      <section id="contact">
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
