/* eslint-disable @typescript-eslint/prefer-as-const */
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material'
import './style.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import logo from '../../assets/Logo.png'
import ViewStockDevice from '../../views/Product/viewStockDevice'
import ViewStockAccesories from '../../views/Product/viewStockAccessories'
import UpdateProduct from '../../views/Product/updateProduct'
import DeleteProduct from '../../views/Product/deleteProduct'
import DeleteIcon from '@mui/icons-material/Delete'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import TableViewIcon from '@mui/icons-material/TableView'
import AddIcon from '@mui/icons-material/Add'

export const User: React.FC = () => {
    const [controlButton, setControlButton] = useState<'insert' | 'delete' | 'red' | 'update'>('insert')
    const [nameDevice, setNameDevice] = useState('')
    const [value, setValue] = useState('')
    const [type, setType] = useState('')
    const [seriesNumber, setSeriesNumber] = useState<string>('')
    const [status, setStatus] = useState('')
    const [stateBattery, setStateBattery] = useState<string>('')
    const [maxDiscountAmout, setMaxDiscountAmout] = useState<string>('')
    const [check, setCheck] = useState<boolean>(false)
    const [productType, setProductType] = useState<string>('Device')
    const [quantity, setQuantity] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [open, setOpen] = useState(false)

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        boxShadow: 24,
        backgroundColor: '#FFF',
        p: 4,
        borderRadius: 2,
    }

    useEffect(() => {
        if (
            productType === 'Device' &&
            nameDevice &&
            value &&
            type &&
            seriesNumber &&
            stateBattery &&
            maxDiscountAmout
        ) {
            setCheck(true)
        } else if (productType === 'Accessories' && nameDevice && value && type && quantity && maxDiscountAmout) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    }, [maxDiscountAmout, nameDevice, seriesNumber, stateBattery, type, value])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductType((event.target as HTMLInputElement).value)
    }

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const insertProduct = () => {
        if (check) {
            if (productType === 'Device') {
                axios
                    .post(`${import.meta.env.VITE_API_URI}/device`, {
                        name: nameDevice,
                        value: value,
                        type: type,
                        seriesNumber: seriesNumber,
                        status: status,
                        stateBattery: stateBattery,
                        maxDiscountAmout: maxDiscountAmout,
                    })
                    .then((res) => {
                        setMessage(res.data)
                        handleOpen()
                        setTimeout(() => {
                            window.location.reload()
                        }, 2000)
                    })
            } else if (productType === 'Accessories') {
                axios
                    .post(`${import.meta.env.VITE_API_URI}/accessories`, {
                        name: nameDevice,
                        value: value,
                        type: type,
                        quantity: quantity,
                        status: status,
                        maxDiscountAmout: maxDiscountAmout,
                    })
                    .then((res) => {
                        setMessage(res.data)
                        handleOpen()
                        setTimeout(() => {
                            handleClose()
                        }, 3000)
                    })
            }
        }
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
            {/* <Typography
                sx={{
                    width: '100%',
                    fontSize: '22px',
                    margin: '0px 50px',
                    borderBottom: '2px solid #03082e',
                    color: '#03082e',
                }}
            >
                Controle de estoque
            </Typography> */}
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
                        {controlButton === 'insert' && (
                            <>
                                <Grid item display={'flex'} gap="20px" paddingTop={'20px'} style={{ width: '100%' }}>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-basic"
                                        label={productType === 'Device' ? 'Nome do aparelho' : 'Nome do acessorio'}
                                        variant="outlined"
                                        value={nameDevice}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setNameDevice(event.target.value)
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-basic"
                                        label="Valor do aparelho"
                                        variant="outlined"
                                        value={value}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setValue(event.target.value)
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-basic"
                                        label="Tipo do aparelho"
                                        variant="outlined"
                                        value={type}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setType(event.target.value)
                                        }}
                                    />
                                </Grid>

                                <Grid item display={'flex'} gap={'20px'} style={{ width: '100%' }}>
                                    {productType === 'Device' ? (
                                        <>
                                            <TextField
                                                required
                                                fullWidth
                                                id="outlined-basic"
                                                label="Numero de série"
                                                variant="outlined"
                                                value={seriesNumber}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    setSeriesNumber(event.target.value)
                                                }}
                                            />
                                            <TextField
                                                required
                                                fullWidth
                                                id="outlined-basic"
                                                label="Estado da bateria"
                                                variant="outlined"
                                                value={stateBattery}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    setStateBattery(event.target.value)
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <TextField
                                            required
                                            fullWidth
                                            id="outlined-basic"
                                            label="Quantidade"
                                            variant="outlined"
                                            value={quantity}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setQuantity(event.target.value)
                                            }}
                                        />
                                    )}

                                    <TextField
                                        required
                                        fullWidth
                                        id="outlined-basic"
                                        label="Desconto máximo"
                                        variant="outlined"
                                        value={maxDiscountAmout}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setMaxDiscountAmout(event.target.value)
                                        }}
                                    />
                                </Grid>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Status"
                                    variant="outlined"
                                    value={status}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setStatus(event.target.value)
                                    }}
                                />

                                <Button
                                    variant="contained"
                                    sx={{
                                        width: '250px',
                                        backgroundColor: '#2b98c4',
                                        color: '#FFFF',
                                    }}
                                    disabled={check ? false : true}
                                    onClick={insertProduct}
                                >
                                    Inserir produto
                                </Button>
                            </>
                        )}

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
                >
                    <Modal
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <Grid
                                container
                                display={'flex'}
                                flexDirection={'column'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                gap={3}
                            >
                                <img src={logo} width={'150px'} />
                                <Typography id="keep-mounted-modal-description" sx={{ mt: 2, fontSize: 22 }}>
                                    {message}
                                </Typography>
                            </Grid>
                        </Box>
                    </Modal>
                </Grid>
            </Grid>
        </Grid>
    )
}
