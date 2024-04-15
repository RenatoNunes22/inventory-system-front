import './style.css'
import { Button, Grid } from '@mui/material'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import TableViewIcon from '@mui/icons-material/TableView'
import { useEffect, useState } from 'react'
import SoldProduct from '../../views/Sold/SoldProduct'
import ViewStockSoldDevice from '../../views/Sold/viewStockSoldDevice'
import { useMedia } from '../../hooks/mediaQueryHook'
import { useNavigate } from 'react-router-dom'

export const Sold: React.FC = () => {
    const [controlButton, setControlButton] = useState<'sold' | 'history'>('sold')
    const isMobile = useMedia('(max-width: 1250px)')
    const access = localStorage.getItem('role')
    const navigate = useNavigate()

    useEffect(() => {
        if (access) {
            if (access.length >= 2) {
                navigate('/')
            }
        } else {
            navigate('/')
        }
    }, [])

    return (
        <Grid container={true} display={'flex'} direction={'row'} alignItems={'center'} justifyContent={'start'} xs={12} lg={12} xl={12}>
            <Grid
                container={true}
                display={'flex'}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'center'}
                xs={12}
                lg={12}
                xl={12}
                sx={{ padding: '0px 20px' }}
            >
                <Grid
                    container
                    display={'flex'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    xs={12}
                    lg={12}
                    xl={12}
                    gap={2}
                    paddingBottom={2}
                >
                    <Grid
                        display={'flex'}
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'start'}
                        gap={4}
                        sx={{ paddingBottom: '20px' }}
                    >
                        <Button
                            onClick={() => {
                                setControlButton('sold')
                            }}
                            sx={{ borderRadius: 0, color: '#FFFF' }}
                            className={`botao ${controlButton === 'sold' ? 'clicado' : ''}`}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <ShoppingCartRoundedIcon />
                                {isMobile ? 'Vender' : 'Realizar venda'}
                            </div>
                        </Button>
                        <Button
                            onClick={() => {
                                setControlButton('history')
                            }}
                            sx={{ borderRadius: 0, color: '#FFFF' }}
                            className={`botao ${controlButton === 'history' ? 'clicado' : ''}`}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <TableViewIcon />
                                {isMobile ? 'Historico' : 'Historico de venda'}
                            </div>
                        </Button>
                    </Grid>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: isMobile ? '100%' : '90%',
                            padding: isMobile ? '10px' : '15px',
                            marginTop: '10px',
                            borderRadius: '16px',
                            background: 'rgba(248, 249, 251, 0.15)',
                            boxShadow: '0px 0px 35px 0px rgba(0, 0, 0, 0.25)',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                gap: '20px',
                                width: '100%',
                                padding: '50px',
                                borderRadius: '10px',
                                background: '#FFFF',
                                boxShadow: '5px 5px 30px 0px rgba(0, 0, 0, 0.30)',
                            }}
                        >
                            {controlButton === 'sold' ? (
                                <div className="title">
                                    <ShoppingCartRoundedIcon sx={{ color: '#03082e', width: '30px', height: '30px' }} />
                                    Detalhes da venda
                                </div>
                            ) : (
                                <div className="title">
                                    <ShoppingCartRoundedIcon sx={{ color: '#03082e', width: '30px', height: '30px' }} />
                                    Historico de vendas
                                </div>
                            )}

                            {controlButton === 'sold' && <SoldProduct />}
                            {controlButton === 'history' && <ViewStockSoldDevice />}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}
