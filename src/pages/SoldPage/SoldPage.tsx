import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import TableViewIcon from '@mui/icons-material/TableView'
import { useState } from 'react'
import './style.css'
import SoldProduct from '../../views/Sold/SoldProduct'
import ViewStockSoldDevice from '../../views/Sold/viewStockSoldDevice'
import { useMedia } from '../../hooks/mediaQueryHook'

export const Sold: React.FC = () => {
    const [controlButton, setControlButton] = useState<'sold' | 'history'>('sold')
    const [productType, setProductType] = useState<string>('Device')
    const isMobile = useMedia('(max-width: 1250px)')
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductType((event.target as HTMLInputElement).value)
    }
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
                                Realizar venda
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
                                Historico de venda
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
                            <FormControl
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <FormLabel color="primary" id="demo-row-radio-buttons-group-label">
                                    Selecione o tipo do produto
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={productType}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel
                                        value="Device"
                                        control={<Radio defaultChecked={true} />}
                                        label="Aparelhos"
                                    />
                                    <FormControlLabel value="Accessories" control={<Radio />} label="Acessórios" />
                                </RadioGroup>
                            </FormControl>

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

                            {controlButton === 'sold' && <SoldProduct productType={productType} />}
                            {controlButton === 'history' && <ViewStockSoldDevice />}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}
