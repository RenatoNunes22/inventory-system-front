import {
    Box,
    Button,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Snackbars from '../../components/SnackBar'
import { Accessories } from '../../model/Accessories'
import { Device } from '../../model/Device'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { Client } from '../../model/Client'

type InsertProductProps = {
    productType: string
}

export default function SoldProduct({ productType }: InsertProductProps) {
    const user = localStorage.getItem('user')
    const [listDevice, setListDevice] = useState<Device[]>()
    const [listAccessories, setListAccessories] = useState<Accessories[]>()
    const [listClient, setListClients] = useState<Client[]>()
    const [search, setSearch] = useState<number | string>('')
    const [seletedDevice, setSeletedDevice] = useState<Device>()
    const [seletedAccessories, setSeletedAccessories] = useState<Accessories>()
    const [seletedClient, setSeletedClient] = useState<Client>()

    const [client, setClient] = useState<string>()
    const [nameClient, setNameClient] = useState('')
    const [email, setEmail] = useState<string>('')
    const [fees, setFees] = useState<string>('')
    const [cpf, setCPF] = useState<string>('')
    const [dn, setDn] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [quantity, setQuantity] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [open, setOpen] = useState(false)

    const [value, setValue] = useState('')
    const [check, setCheck] = useState<boolean>(false)
    const [selectedPayment, setSelectedPayment] = useState<string>('')
    const formPayment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito', 'Pix', 'Boleto']

    useEffect(() => {
        Promise.all([
            axios.get(`${import.meta.env.VITE_API_URI}/devices/`),
            axios.get(`${import.meta.env.VITE_API_URI}/accessories/`),
            axios.get(`${import.meta.env.VITE_API_URI}/clients/`),
        ]).then((res) => {
            setListDevice(res[0].data)
            setListAccessories(res[1].data)
            setListClients(res[2].data)
        })
    }, [productType, open])

    const handleChange = (event: SelectChangeEvent) => {
        setSearch(event.target.value)
    }

    const handleChangeFormPayment = (event: SelectChangeEvent) => {
        setSelectedPayment(event.target.value)
    }

    const handleChangeClient = (event: SelectChangeEvent) => {
        setClient(event.target.value)
    }

    useEffect(() => {
        if (productType === 'Device') {
            axios.get(`${import.meta.env.VITE_API_URI}/devices/${search}`).then((res) => {
                setSeletedDevice(res.data[0])
            })
        } else if (productType === 'Accessories') {
            axios.get(`${import.meta.env.VITE_API_URI}/accessories/${search}`).then((res) => {
                setSeletedAccessories(res.data[0])
            })
        }
    }, [search])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URI}/clients/${client}`).then((res) => {
            setSeletedClient(res.data[0])
        })
    }, [client])

    useEffect(() => {
        setSeletedDevice(undefined)
        setSeletedAccessories(undefined)
        setSeletedClient(undefined)
    }, [productType])

    useEffect(() => {
        if (seletedDevice || (seletedAccessories && nameClient && value && email && cpf)) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    }, [seletedDevice, seletedAccessories, nameClient, value, email, cpf])

    const soldProduct = () => {
        if (productType === 'Device') {
            axios
                .put(`${import.meta.env.VITE_API_URI}/deviceSold/${search}`, {
                    soldValue: value,
                    seriesNumber: seletedDevice?.seriesNumber,
                    expense: 0,
                    fees: Number(fees),
                    formPayment: selectedPayment,
                    client: seletedClient?.cpf,
                    seller: user,
                })
                .then((res) => {
                    setMessage(res.data)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        window.location.reload()
                    }, 2000)
                })
        } else if (productType === 'Accessories') {
            axios
                .post(`${import.meta.env.VITE_API_URI}/sold`, {
                    name: seletedAccessories?.name,
                    value: value,
                    type: seletedAccessories?.type,
                    quantity: quantity,
                    status: seletedAccessories?.status,
                    maxDiscountAmout: seletedAccessories?.maxDiscountAmout,
                    payment: selectedPayment,
                    client: seletedClient?.cpf,
                })
                .then((res) => {
                    setMessage(res.data)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        window.location.reload()
                    }, 2000)
                })
        }
    }

    return (
        <>
            <Grid
                item
                display={'flex'}
                flexDirection={'row'}
                alignItems={'start'}
                gap="20px"
                paddingTop={'10px'}
                style={{ width: '100%' }}
            >
                <Box sx={{ minWidth: '200px', width: '100%' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Selecione o produto</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={
                                productType === 'Device' && seletedDevice
                                    ? seletedDevice?.seriesNumber
                                    : seletedAccessories
                                    ? seletedAccessories?.name
                                    : ''
                            }
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
                </Box>

                <Box sx={{ minWidth: '200px', width: '100%' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Forma de pagamento</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedPayment}
                            label="Forma de pagamento"
                            onChange={handleChangeFormPayment}
                        >
                            {formPayment?.map((item) => (
                                <MenuItem value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                {selectedPayment === 'Cartão de crédito' && (
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Valor da tarifa"
                        variant="outlined"
                        value={fees ? fees : undefined}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setFees(event.target.value)
                        }}
                    />
                )}
                {productType === 'Device' ? (
                    <Box sx={{ minWidth: '200px', width: '100%' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Selecione um brinde</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={''}
                                label="Selecione um brinde"
                                onChange={handleChange}
                            >
                                {listAccessories?.map((accessories: Accessories) => (
                                    <MenuItem value={accessories.name}>{accessories.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                ) : (
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Quantidade"
                        variant="outlined"
                        value={quantity ? quantity : undefined}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setQuantity(event.target.value)
                        }}
                    />
                )}

                <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">Valor do produto</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={value !== '' ? <InputAdornment position="start">R$</InputAdornment> : null}
                        label="Valor do produto"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setValue(event.target.value)
                        }}
                    />
                </FormControl>
            </Grid>

            <Grid container display={'flex'} gap={'20px'} style={{ marginTop: '20px', width: '100%' }}>
                <div className="title">
                    <PeopleAltIcon sx={{ color: '#03082e', width: '30px', height: '30px' }} />
                    Detalhes do cliente
                </div>
            </Grid>
            <Grid item display={'flex'} gap={'20px'} style={{ width: '100%' }}>
                <Box sx={{ minWidth: '200px', width: '100%' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Selecione o cliente</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={client ? client : ''}
                            label="Selecione o cliente"
                            onChange={handleChangeClient}
                        >
                            {listClient?.map((item) => (
                                <MenuItem value={item.cpf}>{item.cpf}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <TextField
                    required
                    fullWidth
                    id="outlined-basic"
                    label="CPF"
                    variant="outlined"
                    value={seletedClient?.cpf ? seletedClient.cpf : cpf}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setCPF(event.target.value)
                    }}
                />

                <TextField
                    required
                    fullWidth
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={seletedClient?.email ? seletedClient.email : email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(event.target.value)
                    }}
                />
            </Grid>
            <Grid item display={'flex'} gap={'20px'} style={{ width: '100%' }}>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Nome do cliente"
                    variant="outlined"
                    value={seletedClient?.name ? seletedClient.name : nameClient}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setNameClient(event.target.value)
                    }}
                />
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Data de nascimento"
                    variant="outlined"
                    value={seletedClient?.dn ? seletedClient.dn : dn}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setDn(event.target.value)
                    }}
                />
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Telefone"
                    variant="outlined"
                    value={seletedClient?.telephone ? seletedClient.telephone : phone}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setPhone(event.target.value)
                    }}
                />
            </Grid>
            <Snackbars
                message={message}
                type={message !== 'Produto inserido com sucesso!' ? 'error' : 'success'}
                open={open}
            />
            <Grid
                item
                display={'flex'}
                justifyContent={'end'}
                gap={'20px'}
                style={{ width: '100%', marginTop: '20px' }}
            >
                <Button
                    variant="contained"
                    sx={{
                        width: '200px',
                        backgroundColor: '#2b98c4',
                        color: '#FFFF',
                    }}
                    disabled={seletedClient ? false : true}
                    onClick={() => {
                        setSeletedClient(undefined)
                        setClient(undefined)
                    }}
                >
                    Limpar cliente
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        width: '200px',
                        backgroundColor: '#2b98c4',
                        color: '#FFFF',
                    }}
                    disabled={check ? false : true}
                    onClick={soldProduct}
                >
                    Vender produto
                </Button>
            </Grid>
        </>
    )
}
