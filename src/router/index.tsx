import { createBrowserRouter } from "react-router-dom"
// routes
import FourOFour from '../views/404'
import Wrapper from '../views/Wrapper'
import Vaults from '../views/Vaults'
import ManageVault from '../views/ManageVault'
import Landing from '../views/Landing'

import Navbar from "../components/Navbar"

const Layout: any = ((View: any) => {
  return (
    <>
    <Navbar />
    <div className='max-w-7xl mx-auto'>
      { View }
    </div>
    </>
  )
})

const routesList = [
  {
    path: "/",
    element: Layout(<Landing />),
    errorElement: <FourOFour />
  },
  {
    path: "/wrapper",
    element: Layout(<Wrapper />)
  },
  {
    path: "/vaults",
    element: Layout(<Vaults />)
  },
  {
    path: "/manage/",
    element: Layout(<ManageVault />)
  }
]

// router
const router = createBrowserRouter(routesList)

export default router
export const routes = routesList