import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import HeroSection from '@/components/public/HeroSection'
import AboutSection from '@/components/public/AboutSection'
import ProjectsSection from '@/components/public/ProjectsSection'
import MediaSection from '@/components/public/MediaSection'
import CommunitySection from '@/components/public/CommunitySection'
import ContactSection from '@/components/public/ContactSection'
import {
  subscribeAbout,
  subscribeProjects,
  subscribeMedia,
  subscribeVisibility,
} from '@/services/firebase'

export default function HomePage() {
  const { socials } = useOutletContext()
  const [about, setAbout] = useState(null)
  const [projects, setProjects] = useState([])
  const [media, setMedia] = useState([])
  const [visibility, setVisibility] = useState({
    about: true, projects: true, media: true, community: true, contact: true,
  })

  useEffect(() => {
    const unsubs = [
      subscribeAbout(setAbout),
      subscribeProjects(setProjects),
      subscribeMedia(setMedia),
      subscribeVisibility(setVisibility),
    ]
    return () => unsubs.forEach(u => u())
  }, [])

  return (
    <>
      <HeroSection />
      {visibility.about !== false && <AboutSection data={about} />}
      {visibility.projects !== false && <ProjectsSection projects={projects} />}
      {visibility.media !== false && <MediaSection media={media} />}
      {visibility.community !== false && <CommunitySection />}
      {visibility.contact !== false && <ContactSection socials={socials} />}
    </>
  )
}
