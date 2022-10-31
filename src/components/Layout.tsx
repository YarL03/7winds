import { Outlet } from 'react-router-dom'
import Header from './Header'
import Navigation from './Navigation'



const Layout = () => {

    return (
        <div>
            <Header/>
            <div>
                <Navigation/>
            </div>
            <div className='layout'>
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout