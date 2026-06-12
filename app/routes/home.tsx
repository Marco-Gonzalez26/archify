import { ArrowRight, ArrowUp, ArrowUpRight, Clock } from 'lucide-react'
import { Navbar } from '../../components/Navbar'
import type { Route } from './+types/home'
import Button from '../../components/ui/Button'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' }
  ]
}

export default function Home() {
  return (
    <div className='p-10 text-center home'>
      <Navbar />
      <section className='hero'>
        <div className='announce'>
          <div className='dot'>
            <div className='pulse' />
          </div>
          <p>Introducing Arquify</p>
        </div>
        <h1>Build beautiful spaces at the speed of thought with Arquify</h1>
        <p className='subtitle'>
          Archify is an AI-powered design environment that allows you to
          visualize, render and ship architectural projects faster than ever
          before.
        </p>
        <div className='actions'>
          <a className='cta' href='#upload'>
            Start Building <ArrowRight className='icon' />
          </a>
          <Button variant='outline' size='sm' className='demo'>
            Watch Demo
          </Button>
        </div>
        <div className='upload-shell' id='upload'>
          <div className='grid-overlay' />
          <div className='upload-card'>
            <div className='upload-head'>
              <div className='upload-icon'>
                <ArrowUp className='icon' />
              </div>

              <h3>Upload your floor plan here</h3>
              <p>Supports JPG, PNG, formats up to 10MB</p>
            </div>
            <p>Upload Images</p>
          </div>
        </div>
      </section>
      <section className='projects'>
        <div className='section-inner'>
          <div className='section-head'>
            <div className='copy'>
              <h2>Projects</h2>
              <p>
                See what others have built with Arquify. Browse through the
                gallery of projects and get inspired.
              </p>
            </div>
          </div>
          <div className='projects-grid'>
            <div className='project-card group'>
              <div className='preview'>
                <img
                  src='https://roomify-mlhuk267-dfwu1i.puter.site/projects/1770803585402/rendered.png'
                  alt='Preview'
                />
                <div className='badge'>
                  <span>Community</span>
                </div>
              </div>
              <div className='card-body'>
                <div>
                  <h3>Project New York</h3>
                  <div className='meta'>
                    <Clock size={12}/>
                    <span>{new Date().toLocaleDateString()}</span>
                    <span>by Alwaysdev</span>
                  </div>
                </div>
                <div className='arrow'>
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
