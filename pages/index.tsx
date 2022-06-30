import type { NextPage } from 'next'
import Image  from 'next/image'

import ContentCard from '../components/ContentCard'
import Header from '../components/Header'
import type { NavItem } from '../components/Header'

import profilePic from '../public/images/profile.jpg'

const Home: NextPage = () => {
  const navItems: NavItem[] = [
    { name: 'home', url: '#home', active: false },
    { name: 'skills', url: '#skills', active: false },
    { name: 'projects', url: '', active: false },
    { name: 'contact', url: '#contact', active: true },
  ];
  return (
    <>
      <Header items={navItems}></Header>

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
          <h1>Yoooooooo</h1>
        </ContentCard>
      </section>

      <section id="contact">
        <ContentCard>
          <h1>Yoooooooo</h1>
        </ContentCard>
      </section>      
    </>

  )
}

export default Home
