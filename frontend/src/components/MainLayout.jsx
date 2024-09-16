
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'

const MainLayout = () => {
  return (
    <div>
         <LeftSidebar/>
        <div>
            {/* with the help of Outlet package from router-dom the sidebar stays the same and 
                all children components mentioned in App.jsx gets rendered dynamically   */}
            <Outlet/> 
        </div>
    </div>
  )
}

export default MainLayout