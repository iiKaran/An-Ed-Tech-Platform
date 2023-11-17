import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useLocation,matchPath,Link} from 'react-router-dom'


export default function SideLink({icon, path , title , key}) {
    const location = useLocation();
     const Icon = Icons[icon]
     const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }
  return (
    <Link className={`flex  py-2 px-4 gap-4 items-center text-richblack-200 cursor-pointer ${matchRoute(path)?"bg-yellow-50 text-richblack900 font-bold":""}`} to={path}>
        <span>
         <Icon className="text-lg"/>
        </span>
        <span>
            {title}
        </span>
    </Link>
  )
}
