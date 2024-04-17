import './style.css'
import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '../../assets/the_brothers.png'
import LogoWhite from '../../assets/the_brothers.png'
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

    const role = Number(localStorage.getItem('role'))

    useEffect(() => {
        pathname === '/Sold'
            ? setClick('Vendas')
            : pathname === '/Inventory'
            ? setClick('Gerenciamento de estoque')
            : pathname === '/User'
            ? setClick('Usuarios')
            : pathname === '/System'
            ? setClick('Serviços')
            : setClick('')
    }, [pathname])

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
                <img src={modeTheme ? Logo : LogoWhite} width={isMobile ? '100px' : '100px'} />
                <div className="containerButtons" style={{ gap: isMobile ? '20px' : '40px', width: isMobile ? '100%' : '' }}>
                    <Button
                        onClick={() => {
                            setClick('Serviços')
                            navigate('/System')
                        }}
                        sx={{ borderRadius: 0, color: '#FFF' }}
                        className={`button ${click === 'Serviços' ? 'clicado' : ''}`}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>Serviços</div>
                    </Button>
                    {/* <Button
                        onClick={() => {
                            setClick('Vendas')
                            navigate('/Sold')
                        }}
                        sx={{ borderRadius: 0, color: '#FFF' }}
                        className={`button ${click === 'Vendas' ? 'clicado' : ''}`}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>VENDAS</div>
                    </Button>
                    <Button
                        onClick={() => {
                            setClick('Inventory')
                            navigate('/Inventory')
                        }}
                        sx={{ borderRadius: 0, color: '#FFF' }}
                        className={`button ${click === 'ESTOQUE' ? 'clicado' : ''}`}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>ESTOQUE</div>
                    </Button> */}
                    {role < 2 && (
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
                    )}

                    <Button
                        onClick={() => {
                            navigate('/')
                        }}
                        sx={{
                            borderRadius: 10,
                            color: '#FFF',
                            backgroundColor: '#c5a400',
                            cursor: 'pointer',
                            px: 4,
                            '&:hover': { backgroundColor: '#003e6d' },
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>SAIR</div>
                    </Button>
                </div>
                {children}
            </Grid>
        )
    }
    return
}
