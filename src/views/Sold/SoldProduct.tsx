import {
    Box,
    Button,
    FormControl,
    FormHelperText,
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
import InputMask from 'react-input-mask'

type InsertProductProps = {
    productType: string
}

export default function SoldProduct({ productType }: InsertProductProps) {
    const user = localStorage.getItem('user')?.replace(/"/g, '')
    const [listDevice, setListDevice] = useState<Device[]>()
    const [listAccessories, setListAccessories] = useState<Accessories[]>()
    const [search, setSearch] = useState<number | string>('')
    const [seletedDevice, setSeletedDevice] = useState<Device>()
    const [seletedAccessories, setSeletedAccessories] = useState<Accessories>()
    const [seletedClient, setSeletedClient] = useState<Client>()
    const [gift, setGift] = useState<string>()

    //CLIENT
    const [selectedClient, setSelectedClient] = useState<Client>()
    const [nameClient, setNameClient] = useState('')
    const [email, setEmail] = useState<string>('')
    const [fees, setFees] = useState<string>('')
    const [cpf, setCPF] = useState<string>('')
    const [dn, setDn] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [quantity, setQuantity] = useState<string>('')

    //ADDRESS
    const [cep, setCep] = useState<string>('')
    const [state, setState] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [neighborhood, setNeighborhood] = useState<string>('')
    const [street, setStreet] = useState<string>('')
    const [number, setNumber] = useState<string>('')
    const [complement, setComplement] = useState<string>('')

    const [message, setMessage] = useState<string>('')
    const [open, setOpen] = useState(false)

    const [value, setValue] = useState('')
    const [check, setCheck] = useState<boolean>(false)
    const [selectedPayment, setSelectedPayment] = useState<string>('')
    const formPayment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito', 'Pix', 'Boleto']
    const caracteresARemover = /[.\-_]/g

    useEffect(() => {
        const newCEP = cep.replace(caracteresARemover, '')
        if (newCEP.length === 8 && !selectedClient) {
            console.log('entrou')
            axios.get(`https://viacep.com.br/ws/${newCEP}/json/`).then((res) => {
                setState(res.data.uf)
                setCity(res.data.localidade)
                setNeighborhood(res.data.bairro)
                setStreet(res.data.logradouro)
            })
        } else if (!selectedClient) {
            setState('')
            setCity('')
            setNeighborhood('')
            setStreet('')
        }
    }, [cep])

    useEffect(() => {
        const newCPF = cpf.replace(caracteresARemover, '')
        if (newCPF.length === 11) {
            axios.get(`${import.meta.env.VITE_API_URI}/clients/${newCPF}`).then((res) => {
                setSelectedClient(res.data[0])
                setNameClient(res.data[0].name)
                setEmail(res.data[0].email)
                setDn(res.data[0].dn)
                setPhone(res.data[0].telephone)
                setCep(res.data[0].cep)
                setState(res.data[0].state)
                setCity(res.data[0].city)
                setNeighborhood(res.data[0].neighborhood)
                setStreet(res.data[0].street)
                setNumber(res.data[0].number)
            })
        } else {
            setSelectedClient(undefined)
            setNameClient('')
            setEmail('')
            setDn('')
            setPhone('')
            setCep('')
            setState('')
            setCity('')
            setNeighborhood('')
            setStreet('')
            setNumber('')
        }
    }, [cpf])

    useEffect(() => {
        Promise.all([
            axios.get(`${import.meta.env.VITE_API_URI}/devices/`),
            axios.get(`${import.meta.env.VITE_API_URI}/accessories/`),
        ]).then((res) => {
            setListDevice(res[0].data)
            setListAccessories(res[1].data)
        })
    }, [productType, open])

    const handleChange = (event: SelectChangeEvent) => {
        setSearch(event.target.value)
    }

    const handleChangeGift = (event: SelectChangeEvent) => {
        setGift(event.target.value)
    }

    const handleChangeFormPayment = (event: SelectChangeEvent) => {
        setSelectedPayment(event.target.value)
    }

    useEffect(() => {
        if (search) {
            if (productType === 'Device') {
                axios.get(`${import.meta.env.VITE_API_URI}/devices/${search}`).then((res) => {
                    setSeletedDevice(res.data[0])
                })
            } else if (productType === 'Accessories') {
                axios.get(`${import.meta.env.VITE_API_URI}/accessories/${search}`).then((res) => {
                    setSeletedAccessories(res.data[0])
                })
            }
        }
    }, [search])

    useEffect(() => {
        setSeletedDevice(undefined)
        setSeletedAccessories(undefined)
        setSeletedClient(undefined)
    }, [productType])

    useEffect(() => {
        if (
            (seletedDevice || seletedAccessories) &&
            nameClient &&
            value &&
            email &&
            cpf &&
            cep &&
            state &&
            city &&
            neighborhood &&
            street &&
            number
        ) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    }, [
        seletedDevice,
        seletedAccessories,
        nameClient,
        value,
        email,
        cpf,
        cep,
        state,
        city,
        neighborhood,
        street,
        number,
    ])

    console.log(cep)

    const soldProduct = () => {
        if (selectedClient === undefined) {
            axios.post(`${import.meta.env.VITE_API_URI}/clients`, {
                email: email,
                cpf: cpf,
                name: nameClient,
                dn: dn,
                telephone: phone,
                cep: cep,
                state: state,
                city: city,
                neighborhood: neighborhood,
                street: street,
                number: number,
                complement: complement,
                products: [],
            })
        }
        if (productType === 'Device') {
            axios
                .post(`${import.meta.env.VITE_API_URI}/deviceSold/${search}`, {
                    soldValue: Number(value),
                    seriesNumber: seletedDevice?.seriesNumber,
                    expense: 0,
                    fees: fees && !isNaN(Number(fees)) ? Number(fees) : 0,
                    formPayment: selectedPayment,
                    client: cpf,
                    seller: user,
                    gift: gift,
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

    const IssueNote = () => {
        axios
            .post(`${import.meta.env.VITE_API_URI}/sendEmail`, {
                email: email,
                cpf: cpf,
                name: nameClient,
                value: value,
                phone: phone,
                cep: cep,
                state: state,
                city: city,
                neighborhood: neighborhood,
                street: street,
                number: number,
                complement: complement,
                product: seletedDevice?.name,
                formPayment: selectedPayment,
            })
            .catch((err) => console.log(err))
    }

    const makeSale = () => {
        IssueNote()
        soldProduct()
    }

    return (
        <>
            <Grid item display={'flex'} flexDirection={'row'} alignItems={'start'} gap="20px" style={{ width: '100%' }}>
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
                    <FormControl fullWidth>
                        <InputLabel htmlFor="outlined-adornment-amount">Valor do produto</InputLabel>
                        <OutlinedInput
                            error={fees && isNaN(Number(fees)) ? true : false}
                            id="outlined-adornment-amount"
                            startAdornment={fees !== '' ? <InputAdornment position="start">R$</InputAdornment> : null}
                            label="Valor da tarifa"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setFees(event.target.value)
                            }}
                        />
                        {fees && isNaN(Number(fees)) && (
                            <FormHelperText error id="accountId-error">
                                Apenas números
                            </FormHelperText>
                        )}
                    </FormControl>
                )}
                {productType === 'Device' ? (
                    <Box sx={{ minWidth: '200px', width: '100%' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Selecione um brinde</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gift ? gift : undefined}
                                label="Selecione um brinde"
                                onChange={handleChangeGift}
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
                        error={value && isNaN(Number(value)) ? true : false}
                        startAdornment={value !== '' ? <InputAdornment position="start">R$</InputAdornment> : null}
                        label="Valor do produto"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setValue(event.target.value)
                        }}
                    />
                    {value && isNaN(Number(value)) && (
                        <FormHelperText error id="accountId-error">
                            Apenas números
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>

            <Grid container display={'flex'} gap={'20px'} style={{ marginTop: '20px', width: '100%' }}>
                <div className="title">
                    <PeopleAltIcon sx={{ color: '#03082e', width: '30px', height: '30px' }} />
                    Detalhes do cliente
                </div>
            </Grid>
            <Grid item display={'flex'} gap={'20px'} style={{ width: '100%' }}>
                <InputMask
                    mask="999.999.999-99"
                    maskPlaceholder={null}
                    value={cpf}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setCPF(event.target.value)
                    }}
                >
                    <TextField fullWidth id="outlined-basic" label="CPF" variant="outlined" />
                </InputMask>
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
            </Grid>
            <Grid item display={'flex'} gap={'20px'} style={{ width: '100%' }}>
                <InputMask mask="99/99/9999" maskPlaceholder={null} value={dn} onChange={(e) => setDn(e.target.value)}>
                    <TextField fullWidth label="Data de nascimento" />
                </InputMask>
                <InputMask
                    mask="(99)99999-9999"
                    maskPlaceholder={null}
                    value={seletedClient?.telephone ? seletedClient.telephone : phone}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setPhone(event.target.value)
                    }}
                >
                    <TextField fullWidth id="outlined-basic" label="Telefone" variant="outlined" />
                </InputMask>
                <InputMask
                    mask="99.999-999"
                    maskPlaceholder={null}
                    value={cep}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setCep(event.target.value)
                    }}
                >
                    <TextField fullWidth id="outlined-basic" label="CEP" variant="outlined" />
                </InputMask>
            </Grid>
            <Grid item display={'flex'} gap={'20px'} style={{ width: '100%' }}>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Estado"
                    variant="outlined"
                    value={state}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setState(event.target.value)
                    }}
                />
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Cidade"
                    variant="outlined"
                    value={city}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setCity(event.target.value)
                    }}
                />
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Bairro"
                    variant="outlined"
                    value={neighborhood}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setNeighborhood(event.target.value)
                    }}
                />
            </Grid>
            <Grid
                item
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'start'}
                gap={'20px'}
                style={{ width: '100%' }}
            >
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Logradouro"
                    variant="outlined"
                    value={street}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setStreet(event.target.value)
                    }}
                />
                <InputMask
                    mask="99999"
                    maskPlaceholder={null}
                    value={number}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setNumber(event.target.value)
                    }}
                >
                    <TextField fullWidth label="Número" />
                </InputMask>

                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Complemento"
                    variant="outlined"
                    value={complement}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setComplement(event.target.value)
                    }}
                />
            </Grid>
            <Snackbars
                message={message}
                type={message !== 'Aparelho vendido com sucesso!' ? 'error' : 'success'}
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
                    disabled={check ? false : true}
                    onClick={makeSale}
                >
                    Vender produto
                </Button>
            </Grid>
        </>
    )
}
