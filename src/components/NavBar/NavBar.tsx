import './style.css'
import { Button, Grid } from '@mui/material'
// import LightModeIcon from '@mui/icons-material/LightMode'
// import DarkModeIcon from '@mui/icons-material/DarkMode'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import LogoWhite from '../../assets/LogoWhite.png'
import { useNavigate } from 'react-router-dom'

export type navBarProps = {
    color?: string
    children?: React.ReactNode
    switchTheme?: () => void
    modeTheme: boolean
}

export const NavBar = ({ color, children, modeTheme }: navBarProps) => {
    const [click, setClick] = useState('')
    const navigate = useNavigate()
    const path = useLocation()
    const { pathname } = path

    useEffect(() => {
        pathname === '/Sold'
            ? setClick('Vendas')
            : pathname === '/Inventory'
            ? setClick('Gerenciamento de estoque')
            : pathname === '/User'
            ? setClick('Usuarios')
            : pathname === '/Admin'
            ? setClick('Area admnistrativa')
            : setClick('')
    }, [pathname])

    // const iconStyle = {
    //     color: modeTheme ? '#000E23' : '#ffff',
    //     cursor: 'pointer',
    // }

    if (pathname !== '/') {
        return (
            <Grid
                container={true}
                display={'flex'}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                xs={12}
                lg={12}
                xl={12}
                sx={{
                    backgroundColor: color,
                    margin: 0,
                    padding: '30px 50px',
                    marginBottom: '5%',
                }}
            >
                <img src={modeTheme ? Logo : LogoWhite} width={'130px'} />
                <div className="containerButtons" style={{ gap: '40px' }}>
                    <Button
                        onClick={() => {
                            setClick('Vendas')
                            navigate('/Sold')
                        }}
                        sx={{ borderRadius: 0, color: '#FFF' }}
                        className={`button ${click === 'Vendas' ? 'clicado' : ''}`}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>Vendas</div>
                    </Button>
                    <Button
                        onClick={() => {
                            setClick('Gerenciamento de estoque')
                            navigate('/Inventory')
                        }}
                        sx={{ borderRadius: 0, color: '#FFF' }}
                        className={`button ${click === 'Gerenciamento de estoque' ? 'clicado' : ''}`}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>Estoque</div>
                    </Button>
                    <Button
                        onClick={() => {
                            setClick('Usuarios')
                            navigate('/User')
                        }}
                        sx={{ borderRadius: 0, color: '#FFF' }}
                        className={`button ${click === 'Usuarios' ? 'clicado' : ''}`}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>Usuarios</div>
                    </Button>

                    {/* <Button
                        onClick={() => {
                            setClick('Area admnistrativa')
                            navigate('/Admin')
                        }}
                        sx={{ borderRadius: 0, color: '#FFF' }}
                        className={`button ${click === 'Area admnistrativa' ? 'clicado' : ''}`}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>Área admnistrativa</div>
                    </Button> */}
                </div>
                {/* <div style={{ display: "flex", gap: "40px" }}>
          {modeTheme ? (
            <LightModeIcon onClick={switchTheme} sx={iconStyle} />
          ) : (
            <DarkModeIcon onClick={switchTheme} sx={iconStyle} />
          )}
        </div> */}
                {children}
            </Grid>
        )
    }
    return
}
