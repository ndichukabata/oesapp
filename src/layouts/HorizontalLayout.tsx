import Customizer from '@/layouts/components/customizer'
import Footer from '@/layouts/components/footer'
import Topbar from '@/layouts/components/topbar'
import { type ChildrenType } from '@/types'
import { lazy } from 'react'
import { Fragment } from 'react'

const ResponsiveNavbar = lazy(() => import('@/layouts/components/responsive-navbar'))

const HorizontalLayout = ({ children }: ChildrenType) => {
  return (
    <Fragment>
      <div className="wrapper">
        <Topbar />

        <ResponsiveNavbar />

        <div className="content-page">
          {children}

          <Footer />
        </div>
      </div>

      <Customizer />
    </Fragment>
  )
}

export default HorizontalLayout
