import './style.css'
import { Button, Grid } from '@mui/material'
// import LightModeIcon from '@mui/icons-material/LightMode'
// import DarkModeIcon from '@mui/icons-material/DarkMode'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import LogoWhite from '../../assets/LogoWhite.png'
import { useNavigate } from 'react-router-dom'
import { useMedia } from '../../hooks/mediaQueryHook'

export type navBarProps = {
    color?: string
    children?: React.ReactNode
    switchTheme?: () => void
    modeTheme: boolean
}

export const NavBar = ({ color, children, modeTheme }: navBarProps) => {
    const isMobile = useMedia('(max-width: 1050px)')
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

    const role = localStorage.getItem('role')

    if (pathname !== '/') {
        return (
            <Grid
                container={true}
                display={'flex'}
                direction={isMobile ? 'column' : 'row'}
                alignItems={'center'}
                gap={isMobile ? 5 : 0}
                justifyContent={'space-between'}
                xs={12}
                lg={12}
                xl={12}
                sx={{
                    backgroundColor: color,
                    margin: 0,
                    padding: isMobile ? '30px 25px' : '30px 50px',
                    marginBottom: '5%',
                }}
            >
                <img src={modeTheme ? Logo : LogoWhite} width={isMobile ? '150px' : '130px'} />
                <div className="containerButtons" style={{ gap: isMobile ? '20px' : '40px', width: isMobile ? '100%' : '' }}>
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
                    {role == '1' && (
                        <>
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
                            <Button
                                onClick={() => {
                                    navigate('/')
                                }}
                                sx={{
                                    borderRadius: 10,
                                    color: '#FFF',
                                    backgroundColor: '#0083c5',
                                    cursor: 'pointer',
                                    px: 4,
                                    '&:hover': { backgroundColor: '#003e6d' },
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>SAIR</div>
                            </Button>
                        </>
                    )}
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
