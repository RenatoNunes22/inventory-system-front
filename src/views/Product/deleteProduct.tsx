import * as React from 'react'
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'
import { Device } from '../../model/Device'
import { formatarData } from '../../utils/formatterData'
import { Accessories } from '../../model/Accessories'
import Snackbars from '../../components/SnackBar'
import { useMedia } from '../../hooks/mediaQueryHook'

type DeleteProductProps = {
    productType: string
}

export default function DeleteProduct({ productType }: DeleteProductProps) {
    const isMobile = useMedia('(max-width: 850px)')
    const [listDevice, setListDevice] = React.useState<Device[]>()
    const [listAccessories, setListAccessories] = React.useState<Accessories[]>()
    const [search, setSearch] = React.useState<number | string>('')
    const [device, setDevice] = React.useState<Device>()
    const [accessories, setAccessories] = React.useState<Accessories>()
    const [newNameProduct, setNewNameProduct] = React.useState<string | undefined>()
    const [newValueProduct, setNewValueProduct] = React.useState<string | undefined>()
    const [newTypeProduct, setNewTypeProduct] = React.useState<string | undefined>()
    const [newSeriesNumberProduct, setNewSeriesNumberProduct] = React.useState<string | undefined>()
    const [newStatusProduct, setNewStatusProduct] = React.useState<string | undefined>()
    const [newStateBatteryProduct, setNewStateBatteryProduct] = React.useState<string | undefined>()
    const [newMaxDiscountAmoutProduct, setNewMaxDiscountAmoutProduct] = React.useState<string | undefined>()
    const [newCreatedAtProduct, setNewCreatedAtProduct] = React.useState<string | undefined>()
    const [newQuantityProduct, setNewQuantityProduct] = React.useState<string | undefined>()
    const [message, setMessage] = React.useState<string>('')
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        setDevice(undefined)
        setAccessories(undefined)
    }, [search])

    const searchProduct = () => {
        if (productType === 'Device') {
            axios
                .get(`${import.meta.env.VITE_API_URI}/devices/${search}`)
                .then((res) => setDataDevice(res.data[0]))
                .catch((err) => console.log(err))
        } else {
            axios
                .get(`${import.meta.env.VITE_API_URI}/accessories/${search}`)
                .then((res) =>
                    productType === 'Device' ? setDataDevice(res.data[0]) : setDataAccessories(res.data[0])
                )
                .catch((err) => console.log(err))
        }
    }

    const deleteProduct = () => {
        if (productType === 'Device') {
            axios
                .delete(`${import.meta.env.VITE_API_URI}/devices/${search}`)
                .then((res) => {
                    setMessage(res.data)
                    setOpen(true)
                    setTimeout(() => {
                        setDevice(undefined)
                        setOpen(false)
                        setNewNameProduct('')
                        searchProduct()
                    }, 2000)
                })
                .catch((err) => console.log(err))
        } else {
            axios
                .delete(`${import.meta.env.VITE_API_URI}/accessories/${search}`)
                .then((res) => {
                    setMessage(res.data)
                    setOpen(true)
                    setTimeout(() => {
                        setAccessories(undefined)
                        setOpen(false)
                        setNewNameProduct('')
                        searchProduct()
                    }, 2000)
                })
                .catch((err) => console.log(err))
        }
    }

    const setDataDevice = (device: Device) => {
        setDevice(device)
        setNewNameProduct(device.name)
        setNewValueProduct(String(device.value))
        setNewTypeProduct(device.type)
        setNewStatusProduct(device.status)
        setNewMaxDiscountAmoutProduct(String(device.maxDiscountAmout))
        setNewCreatedAtProduct(formatarData(device.createdAt))
        setNewSeriesNumberProduct(device.seriesNumber)
        setNewStateBatteryProduct(String(device.stateBattery))
    }

    const setDataAccessories = (accessories: Accessories) => {
        setAccessories(accessories)
        setNewNameProduct(accessories.name)
        setNewValueProduct(String(accessories.value))
        setNewTypeProduct(accessories.type)
        setNewStatusProduct(accessories.status)
        setNewMaxDiscountAmoutProduct(String(accessories.maxDiscountAmout))
        setNewCreatedAtProduct(formatarData(accessories.createdAt))
        setNewQuantityProduct(String(accessories.quantity))
    }

    const handleChange = (event: SelectChangeEvent) => {
        setSearch(event.target.value)
    }

    React.useEffect(() => {
        setDevice(undefined)
        setAccessories(undefined)
        if (productType === 'Device') {
            axios.get(`${import.meta.env.VITE_API_URI}/devices/`).then((res) => {
                setListDevice(res.data)
                setNewNameProduct(res.data[0].name)
            })
        } else if (productType === 'Accessories') {
            axios.get(`${import.meta.env.VITE_API_URI}/accessories/`).then((res) => {
                setListAccessories(res.data)
                setNewNameProduct(res.data[0].name)
            })
        }
    }, [productType])

    return (
        <Grid
            container={true}
            display={'flex'}
            direction={'column'}
            alignItems={'start'}
            justifyContent={'start'}
            xs={12}
            lg={12}
            xl={12}
            gap={2}
        >
            <Grid
                item
                display={'flex'}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'start'}
                xs={12}
                lg={12}
                xl={3}
                gap={1}
                style={{ width: isMobile ? '100%' : '300px' }}
            >
                <Box
                    sx={{
                        minWidth: '200px',
                        width: isMobile ? '100%' : '300px',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: '10px',
                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Selecione o produto</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={newNameProduct}
                            label="Selecione o produto"
                            onChange={handleChange}
                        >
                            {productType === 'Device'
                                ? listDevice?.map((device: Device) => (
                                      <MenuItem
                                          value={device.seriesNumber}
                                      >{`${device.name} - ${device.seriesNumber}`}</MenuItem>
                                  ))
                                : listAccessories?.map((accessories: Accessories) => (
                                      <MenuItem value={accessories.name}>{accessories.name}</MenuItem>
                                  ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        sx={{
                            height: '55px',
                            backgroundColor: '#5e6464',
                            color: '#FFFF',
                        }}
                        onClick={searchProduct}
                    >
                        <SearchIcon />
                    </Button>
                </Box>
            </Grid>
            {(device || accessories) && (
                <Grid
                    item
                    display={'flex'}
                    direction={'column'}
                    alignItems={'start'}
                    justifyContent={'center'}
                    xs={12}
                    lg={12}
                    xl={12}
                    gap={2}
                    pt={5}
                    width={'100%'}
                >
                    <Grid
                        item
                        display={'flex'}
                        direction={isMobile ? 'column' : 'row'}
                        alignItems={'center'}
                        justifyContent={'start'}
                        gap={2}
                        width={'100%'}
                    >
                        <TextField
                            fullWidth
                            disabled
                            id="outlined-basic"
                            label="Nome do produto"
                            variant="outlined"
                            value={newNameProduct}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setNewNameProduct(event.target.value)
                            }}
                        />
                        <TextField
                            fullWidth
                            disabled
                            id="outlined-basic"
                            label="Valor do produto"
                            variant="outlined"
                            value={newValueProduct}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setNewValueProduct(event.target.value)
                            }}
                        />
                        <TextField
                            fullWidth
                            disabled
                            id="outlined-basic"
                            label="Tipo do produto"
                            variant="outlined"
                            value={newTypeProduct}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setNewTypeProduct(event.target.value)
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        display={'flex'}
                        direction={isMobile ? 'column' : 'row'}
                        alignItems={'center'}
                        justifyContent={'start'}
                        xs={12}
                        lg={12}
                        xl={12}
                        gap={2}
                        width={'100%'}
                    >
                        {productType === 'Device' ? (
                            <>
                                <TextField
                                    fullWidth
                                    disabled
                                    id="outlined-basic"
                                    label="Numero de série"
                                    variant="outlined"
                                    value={newSeriesNumberProduct}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setNewSeriesNumberProduct(event.target.value)
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    disabled
                                    id="outlined-basic"
                                    label="Estado da bateria"
                                    variant="outlined"
                                    value={newStateBatteryProduct}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setNewStateBatteryProduct(event.target.value)
                                    }}
                                />{' '}
                            </>
                        ) : (
                            <TextField
                                fullWidth
                                disabled
                                id="outlined-basic"
                                label="Quantidade de produto"
                                variant="outlined"
                                value={newQuantityProduct}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setNewQuantityProduct(event.target.value)
                                }}
                            />
                        )}

                        <TextField
                            fullWidth
                            disabled
                            id="outlined-basic"
                            label="Desconto Máximo"
                            variant="outlined"
                            value={newMaxDiscountAmoutProduct}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setNewMaxDiscountAmoutProduct(event.target.value)
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        display={'flex'}
                        direction={isMobile ? 'column' : 'row'}
                        alignItems={'center'}
                        justifyContent={'start'}
                        xs={12}
                        lg={12}
                        xl={12}
                        gap={2}
                        width={'100%'}
                    >
                        <TextField
                            fullWidth
                            disabled
                            id="outlined-basic"
                            label="Status"
                            variant="outlined"
                            value={newStatusProduct}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setNewStatusProduct(event.target.value)
                            }}
                        />
                        <TextField
                            fullWidth
                            disabled
                            id="outlined-basic"
                            label="Data de criação"
                            variant="outlined"
                            value={newCreatedAtProduct}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setNewCreatedAtProduct(event.target.value)
                            }}
                        />
                    </Grid>
                    <Snackbars
                        message={message}
                        type={message !== 'Produto deletado com sucesso!' ? 'error' : 'success'}
                        open={open}
                    />
                    <Grid item display={'flex'} justifyContent={isMobile ? 'center' : 'end'} width={'100%'}>
                        <Button
                            variant="contained"
                            onClick={deleteProduct}
                            sx={{
                                width: isMobile ? '100%' : '200px',
                                backgroundColor: '#5e6464',
                                color: '#FFFF',
                            }}
                        >
                            Excluir produto
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Grid>
    )
}
