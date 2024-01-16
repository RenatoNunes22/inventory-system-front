import './style.css'
import { Button, Grid } from '@mui/material'
// import LightModeIcon from '@mui/icons-material/LightMode'
// import DarkModeIcon from '@mui/icons-material/DarkMode'
import React, { useState } from 'react'
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
    const [click, setClick] = useState('Gerenciamento de estoque')
    const navigate = useNavigate()
    const path = useLocation()
    const { pathname } = path

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
                    padding: '10px 40px',
                    marginBottom: '50px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px',
                }}
            >
                <img src={modeTheme ? Logo : LogoWhite} width={'130px'} />
                <div className="containerButtons" style={{ gap: '20px' }}>
                    <Button
                        onClick={() => {
                            setClick('Vendas')
                            navigate('/Sold')
                        }}
                        sx={{ borderRadius: 0, color: '#FFF' }}
                        className={`button ${click === 'Vendas' ? 'clicado' : ''}`}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>Vendas</div>
                    </Button>
                    <Button
                        onClick={() => {
                            setClick('Gerenciamento de estoque')
                            navigate('/Inventory')
                        }}
                        sx={{ borderRadius: 0, color: '#FFF' }}
                        className={`button ${click === 'Gerenciamento de estoque' ? 'clicado' : ''}`}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>Estoque</div>
                    </Button>
                    <Button
                        onClick={() => {
                            setClick('Usuarios')
                            navigate('/Users')
                        }}
                        sx={{ borderRadius: 0, color: '#FFF' }}
                        className={`button ${click === 'Usuarios' ? 'clicado' : ''}`}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>Usuarios</div>
                    </Button>

                    <Button
                        onClick={() => {
                            setClick('Area admnistrativa')
                            navigate('/Admin')
                        }}
                        sx={{ borderRadius: 0, color: '#FFF' }}
                        className={`button ${click === 'Area admnistrativa' ? 'clicado' : ''}`}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>Área admnistrativa</div>
                    </Button>
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
