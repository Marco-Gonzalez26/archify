import { Box, LogOut } from 'lucide-react'
import Button from './ui/Button'
import { useOutletContext } from 'react-router'

export const Navbar = () => {
  const { isSignedIn, userName, signIn, signOut } =
    useOutletContext<AuthContextType>()

  const handleAuthClick = async () => {
    if (isSignedIn) {
      try {
        await signOut()
      } catch (error) {
        console.error(`Error signing out: ${error}`)
        return
      }
    } 
      try {
        await signIn()
      } catch (error) {
        console.error(`Error signing in: ${error}`)
        return
      }
    
  }
  return (
    <header className='navbar'>
      <div className='inner'>
        <div className='left'>
          <div className='brand'>
            <Box className='logo' />
            <span className='name'>Arquify</span>
          </div>
          <ul className='links'>
            <a href=''>Products</a>
            <a href=''>Pricing</a>
            <a href=''>Community</a>
            <a href=''>Enterprise</a>
          </ul>
        </div>
        <div className='actions'>
          {isSignedIn ? (
            <>
              <span className='greeting'>
                {userName ? `Hi ${userName}` : 'Signed in'}
              </span>
              <Button size='sm' variant='secondary' className='btn'>
                <LogOut className='icon' />
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button size='sm' variant='ghost' onClick={handleAuthClick}>
                Log in
              </Button>
            </>
          )}

          <a className='cta' href='#'>
            Get started
          </a>
        </div>
      </div>
    </header>
  )
}
