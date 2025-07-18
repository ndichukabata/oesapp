import logoDark from '@/assets/images/logo-black.png'
import logoSm from '@/assets/images/logo-sm.png'
import logo from '@/assets/images/logo.png'
import SimpleBar from 'simplebar-react'
import { useLayoutContext } from '@/context/useLayoutContext'
import AppMenu from '@/layouts/components/sidenav/components/AppMenu'
import UserProfile from '@/layouts/components/sidenav/components/UserProfile'
import { Image } from 'react-bootstrap'
import { TbMenu4, TbX } from 'react-icons/tb'
import { Link } from 'react-router'

const Sidenav = () => {
  const { sidenav, hideBackdrop, changeSideNavSize } = useLayoutContext()

  const toggleSidebar = () => {
    changeSideNavSize(sidenav.size === 'on-hover-active' ? 'on-hover' : 'on-hover-active')
  }

  const closeSidebar = () => {
    const html = document.documentElement
    html.classList.toggle('sidebar-enable')
    hideBackdrop()
  }

  return (
    <div className="sidenav-menu">
      <Link to="/" className="logo">
        <span className="logo logo-light">
          {/* <span className="logo-lg">
            <Image src={logo} alt="logo" width={92.3} height={26} />
          </span>
          <span className="logo-sm">
            <Image src={logoSm} alt="small logo" width={30.55} height={26} />
          </span> */}
        </span>

        <span className="logo logo-dark">
          {/* <span className="logo-lg">
            <Image src={logoDark} alt="dark logo" width={92.3} height={26} />
          </span>
          <span className="logo-sm">
            <Image src={logoSm} alt="small logo" width={30.55} height={26} />
          </span> */}
        </span>
      </Link>

      <button className="button-on-hover">
        <TbMenu4 onClick={toggleSidebar} className="ti ti-menu-4 fs-22 align-middle" />
      </button>

      <button className="button-close-offcanvas">
        <TbX onClick={closeSidebar} className="align-middle" />
      </button>

      <SimpleBar id="sidenav" className="scrollbar">
     
        <AppMenu />
      </SimpleBar>
    </div>
  )
}

export default Sidenav
