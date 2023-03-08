import { matchRoutes, useLocation } from "react-router-dom"
import { routes } from '../router'

const useCurrentPath = () => {
  const location = useLocation()
  return matchRoutes(routes, location)
}

export default useCurrentPath