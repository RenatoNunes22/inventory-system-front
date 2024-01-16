/* eslint-disable @typescript-eslint/prefer-as-const */
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material'
import './style.css'
import { useState } from 'react'

import ViewStockDevice from '../../views/Product/viewStockDevice'
import ViewStockAccesories from '../../views/Product/viewStockAccessories'
import UpdateProduct from '../../views/Product/updateProduct'
import DeleteProduct from '../../views/Product/deleteProduct'
import DeleteIcon from '@mui/icons-material/Delete'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import TableViewIcon from '@mui/icons-material/TableView'
import AddIcon from '@mui/icons-material/Add'
import InsertProduct from '../../views/Product/insertProduct'

export const Inventory: React.FC = () => {
    const [controlButton, setControlButton] = useState<'insert' | 'delete' | 'red' | 'update'>('insert')

    const [productType, setProductType] = useState<string>('Device')

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
                    lg={3}
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
                                Inserir produto
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
                                Visualizar estoque
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
                                Atualizar produto
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
                                Excluir produto
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
                        <FormControl>
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
                        {controlButton === 'insert' && <InsertProduct productType={productType} />}
                        {controlButton === 'red' && productType === 'Device' && <ViewStockDevice />}
                        {controlButton === 'red' && productType === 'Accessories' && <ViewStockAccesories />}
                        {controlButton === 'update' && <UpdateProduct productType={productType} />}
                        {controlButton === 'delete' && <DeleteProduct productType={productType} />}
                    </div>
                </Grid>

                <Grid
                    container
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'end'}
                    alignItems={'end'}
                    xs={12}
                    lg={3}
                    xl={12}
                ></Grid>
            </Grid>
        </Grid>
    )
}
