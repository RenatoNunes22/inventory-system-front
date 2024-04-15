import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar/NavBar'
import { Login } from './pages/LoginPage/Login'
import { Service } from './pages/ServicePage/ServicePage'
import { User } from './pages/UserPage/UserPage'
import { Inventory } from './pages/InventoryPage/InventoryPage'
import { Sold } from './pages/SoldPage/SoldPage'

export type appProps = {
    switchTheme: () => void
    modeTheme: boolean
}

export const AppRoutes = ({ switchTheme, modeTheme }: appProps) => {
    return (
        <>
            <Router>
                <NavBar modeTheme={modeTheme} switchTheme={switchTheme} color={modeTheme ? '#FFFF' : 'transparent'} />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/System" element={<Service />} />
                    <Route path="/Inventory" element={<Inventory />} />
                    <Route path="/Sold" element={<Sold />} />
                    <Route path="/User" element={<User />} />
                </Routes>
            </Router>
        </>
    )
}
