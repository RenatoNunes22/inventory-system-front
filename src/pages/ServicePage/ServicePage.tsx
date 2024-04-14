/* eslint-disable @typescript-eslint/prefer-as-const */
import { Grid } from '@mui/material'
import './style.css'
import { useEffect } from 'react'

import { useMedia } from '../../hooks/mediaQueryHook'
import { useNavigate } from 'react-router-dom'
import InsertService from '@/views/Service/insertservice'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'

export const Service: React.FC = () => {
    const isMobile = useMedia('(max-width: 600px)')
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
                                <AddToPhotosIcon sx={{ color: '#03082e', width: '30px', height: '30px' }} />
                                Adição de serviços
                            </div>

                            <InsertService />
                            {/* {controlButton === 'update' && <UpdateProduct />}
                            {controlButton === 'delete' && <DeleteProduct  />} */}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}
