import { Button, Grid } from '@mui/material'
import './style.css'
import { useEffect, useState } from 'react'
import UpdateProduct from '../../views/Product/updateProduct'
import DeleteProduct from '../../views/Product/deleteProduct'
import DeleteIcon from '@mui/icons-material/Delete'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import TableViewIcon from '@mui/icons-material/TableView'
import AddIcon from '@mui/icons-material/Add'
import InsertProduct from '../../views/Product/insertProduct'
import { useMedia } from '../../hooks/mediaQueryHook'
import { useNavigate } from 'react-router-dom'
import ViewStockProduct from '../../views/Product/viewStockProduct'

export const Inventory: React.FC = () => {
    const [controlButton, setControlButton] = useState<'insert' | 'delete' | 'red' | 'update'>('insert')
    const isMobile = useMedia('(max-width: 600px)')
    const switchName = useMedia('(max-width: 850px)')
    const access = localStorage.getItem('role')
    const navigate = useNavigate()

    useEffect(() => {
        if (access) {
            if (access.length >= 2 || access === '2') {
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
                    justifyContent={'center'}
                    flexDirection={'column'}
                    xs={12}
                    lg={12}
                    xl={12}
                    gap={2}
                    paddingBottom={2}
                >
                    <Grid display={'flex'} direction={'row'} alignItems={'center'} justifyContent={'start'} gap={4}>
                        <Grid
                            display={'flex'}
                            direction={isMobile ? 'column' : 'row'}
                            alignItems={'center'}
                            justifyContent={'start'}
                            gap={4}
                            sx={{ paddingBottom: '20px' }}
                        >
                            <Button
                                onClick={() => {
                                    setControlButton('insert')
                                }}
                                sx={{ borderRadius: 0, color: '#FFFF' }}
                                className={`botao ${controlButton === 'insert' ? 'clicado' : ''}`}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <AddIcon />
                                    {switchName ? 'Adicionar' : 'Adicionar produto'}
                                </div>
                            </Button>
                            <Button
                                onClick={() => {
                                    setControlButton('red')
                                }}
                                sx={{ borderRadius: 0, color: '#FFFF' }}
                                className={`botao ${controlButton === 'red' ? 'clicado' : ''}`}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <TableViewIcon />
                                    {switchName ? 'Visualizar' : 'Visualizar estoque'}
                                </div>
                            </Button>
                        </Grid>
                        <Grid
                            display={'flex'}
                            direction={isMobile ? 'column' : 'row'}
                            alignItems={'center'}
                            justifyContent={'start'}
                            gap={4}
                            sx={{ paddingBottom: '20px' }}
                        >
                            <Button
                                onClick={() => {
                                    setControlButton('update')
                                }}
                                sx={{ borderRadius: 0, color: '#FFFF' }}
                                className={`botao ${controlButton === 'update' ? 'clicado' : ''}`}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <SyncAltIcon />
                                    {switchName ? 'Atualizar' : 'Atualizar produto'}
                                </div>
                            </Button>
                            <Button
                                onClick={() => {
                                    setControlButton('delete')
                                }}
                                sx={{ borderRadius: 0, color: '#FFFF' }}
                                className={`botao ${controlButton === 'delete' ? 'clicado' : ''}`}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <DeleteIcon />
                                    {switchName ? 'Excluir' : 'Excluir produto'}
                                </div>
                            </Button>
                        </Grid>
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
                            {controlButton === 'insert' && <InsertProduct />}
                            {controlButton === 'red' && <ViewStockProduct />}
                            {controlButton === 'update' && <UpdateProduct />}
                            {controlButton === 'delete' && <DeleteProduct />}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}
