import { Navbar } from '../../components/Navbar'
import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' }
  ]
}

export default function Home() {
  return (
    <div className='p-10 text-center home'>
      <Navbar/>
      <h1 className='text-3xl'>Welcome to React Router!</h1>
    </div>
  )
}
