import { Button, Grid } from '@mui/material'
import './style.css'
import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import TableViewIcon from '@mui/icons-material/TableView'
import AddIcon from '@mui/icons-material/Add'
import InsertUser from '../../views/User/insertUser'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import ViewStockUser from '../../views/User/viewStockUsers'
import UpdateUser from '../../views/User/updateUser'
import DeleteUser from '../../views/User/deleteUser'
import { useMedia } from '../../hooks/mediaQueryHook'
import { useNavigate } from 'react-router-dom'

export const User: React.FC = () => {
    const isMobile = useMedia('(max-width: 600px)')
    const switchName = useMedia('(max-width: 850px)')
    const [controlButton, setControlButton] = useState<'insert' | 'delete' | 'red' | 'update'>('insert')
    const access = localStorage.getItem('role')
    const navigate = useNavigate()

    useEffect(() => {
        if (!access) {
            navigate('/')
        }
    }, [])

    return (
        <Grid
            container={true}
            display={'flex'}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'start'}
            xs={12}
            lg={12}
            xl={12}
        >
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
                                    {switchName ? 'Adicionar' : 'Adicionar usuário'}
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
                                    {switchName ? 'Visualizar' : 'Visualizar usuários'}
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
                                    {switchName ? 'Atualizar' : 'Atualizar usuário'}
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
                                    {switchName ? 'Excluir' : 'Excluir usuário'}
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
                            <div className="title">
                                <PeopleAltIcon sx={{ color: '#03082e', width: '30px', height: '30px' }} />
                                Gerenciamento de Usuários
                            </div>

                            {controlButton === 'insert' && <InsertUser />}
                            {controlButton === 'red' && <ViewStockUser />}
                            {controlButton === 'update' && <UpdateUser />}
                            {controlButton === 'delete' && <DeleteUser />}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}
