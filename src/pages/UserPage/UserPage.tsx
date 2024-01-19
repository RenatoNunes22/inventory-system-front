import { Button, Grid } from '@mui/material'
import './style.css'
import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import TableViewIcon from '@mui/icons-material/TableView'
import AddIcon from '@mui/icons-material/Add'
import InsertUser from '../../views/User/insertUser'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import ViewStockUser from '../../views/User/viewStockUsers'
import UpdateUser from '../../views/User/updateUser'
import DeleteUser from '../../views/User/deleteUser'

export const User: React.FC = () => {
    const [controlButton, setControlButton] = useState<'insert' | 'delete' | 'red' | 'update'>('insert')

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
                                setControlButton('insert')
                            }}
                            sx={{ borderRadius: 0, color: '#03082e' }}
                            className={`botao ${controlButton === 'insert' ? 'clicado' : ''}`}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <AddIcon />
                                Adicionar usuario
                            </div>
                        </Button>
                        <Button
                            onClick={() => {
                                setControlButton('red')
                            }}
                            sx={{ borderRadius: 0, color: '#03082e' }}
                            className={`botao ${controlButton === 'red' ? 'clicado' : ''}`}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <TableViewIcon />
                                Visualizar usuarios
                            </div>
                        </Button>
                        <Button
                            onClick={() => {
                                setControlButton('update')
                            }}
                            sx={{ borderRadius: 0, color: '#060c3b' }}
                            className={`botao ${controlButton === 'update' ? 'clicado' : ''}`}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <SyncAltIcon />
                                Atualizar usuario
                            </div>
                        </Button>
                        <Button
                            onClick={() => {
                                setControlButton('delete')
                            }}
                            sx={{ borderRadius: 0, color: '#03082e' }}
                            className={`botao ${controlButton === 'delete' ? 'clicado' : ''}`}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <DeleteIcon />
                                Excluir usuario
                            </div>
                        </Button>
                    </Grid>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '20px',
                            width: '90%',
                            padding: '50px',
                            marginTop: '10px',
                            borderRadius: '10px',
                            background: 'rgba(112, 133, 178, 0.05)',
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
                </Grid>
            </Grid>
        </Grid>
    )
}
