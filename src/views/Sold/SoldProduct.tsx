import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    ListItemText,
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
import { useMedia } from '../../hooks/mediaQueryHook'

type InsertProductProps = {
    productType: string
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

export default function SoldProduct({ productType }: InsertProductProps) {
    const isMobile = useMedia('(max-width: 1220px)')
    const user = localStorage.getItem('user')?.replace(/"/g, '')
    const [listDevice, setListDevice] = useState<Device[]>()
    const [listAccessories, setListAccessories] = useState<Array<string>>()
    const [search, setSearch] = useState<number | string>('')
    const [seletedDevice, setSeletedDevice] = useState<Device>()
    const [seletedAccessories, setSeletedAccessories] = useState<Accessories>()
    const [seletedClient, setSeletedClient] = useState<Client>()
    const [gift, setGift] = useState<string[]>([])
    const [minValue, setMinValue] = useState<number>()

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

    const [personName, setPersonName] = useState<string[]>([])
    const [value, setValue] = useState('')
    const [check, setCheck] = useState<boolean>(false)
    const formPayment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito', 'Pix', 'Boleto', 'Aparelho na troca']
    const caracteresARemover = /[.\-_]/g

    const handleChange = (event: SelectChangeEvent) => {
        setSearch(event.target.value)
    }

    const handleChangePayment = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event
        setPersonName(typeof value === 'string' ? value.split(',') : value)
    }

    const handleChangeGift = (event: SelectChangeEvent<typeof gift>) => {
        const {
            target: { value },
        } = event
        setGift(typeof value === 'string' ? value.split(',') : value)
    }

    useEffect(() => {
        if (productType === 'Device' && seletedDevice) {
            setMinValue(seletedDevice?.outputValue - seletedDevice?.maxDiscountAmout)
        } else if (productType === 'Accessories' && seletedAccessories) {
            setMinValue((seletedAccessories?.outputValue - seletedAccessories?.maxDiscountAmout) * Number(quantity))
        }
    }, [seletedDevice, seletedAccessories, quantity, productType])

    console.log('seletedDevice', seletedAccessories)

    useEffect(() => {
        const newCEP = cep.replace(caracteresARemover, '')
        if (newCEP.length === 8 && !selectedClient) {
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
        if (cpf.length === 14) {
            axios.get(`${import.meta.env.VITE_API_URI}/clients/${cpf}`).then((res) => {
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
            const listItems = res[1].data.map((item: Accessories) => item.name)
            setListAccessories(listItems)
        })
    }, [productType, open])

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
        setSeletedDevice({} as Device)
        setSeletedAccessories({} as Accessories)
        setSeletedClient({} as Client)
    }, [productType])

    useEffect(() => {
        if (seletedDevice || seletedAccessories) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    }, [seletedDevice, seletedAccessories])

    const soldProduct = () => {
        if (selectedClient === undefined || productType === 'Device') {
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
                    soldValue: Number(value.replace('R$: ', '')),
                    seriesNumber: seletedDevice?.seriesNumber,
                    expenses: 0,
                    fees: fees && !isNaN(Number(fees)) ? Number(fees) : 0,
                    formPayment: personName,
                    client: cpf,
                    seller: user,
                    gift: gift,
                })
                .then((res) => {
                    setMessage(res.data)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        if (message === 'Aparelho vendido com sucesso!') {
                            window.location.reload()
                        }
                    }, 1500)
                })
        } else if (productType === 'Accessories') {
            axios
                .post(`${import.meta.env.VITE_API_URI}/accessoriesSold`, {
                    name: seletedAccessories?.name,
                    value: Number(value.replace('R$: ', '')),
                    type: seletedAccessories?.type,
                    formPayment: personName,
                    quantity: Number(quantity),
                    status: seletedAccessories?.status,
                    maxDiscountAmout: seletedAccessories?.maxDiscountAmout,
                    payment: personName,
                })
                .then((res) => {
                    setMessage(res.data)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        if (message === 'Acessório vendido com sucesso!') {
                            window.location.reload()
                        }
                    }, 1000)
                })
        }
    }

    const IssueNote = () => {
        axios
            .post(`${import.meta.env.VITE_API_URI}/sendEmail`, {
                email: email ? email : 'renatonunes0011@gmail.com',
                cpf: cpf,
                name: nameClient,
                value: value.replace('R$: ', ''),
                phone: phone,
                cep: cep,
                state: state,
                city: city,
                neighborhood: neighborhood,
                street: street,
                number: number,
                complement: complement,
                product: seletedDevice?.name,
                formPayment: personName,
            })
            .catch((err) => console.log(err))
    }

    const makeSale = () => {
        if (productType === 'Device') {
            soldProduct()
            IssueNote()
        } else if (productType === 'Accessories') {
            soldProduct()
        }
    }

    return (
        <>
            <Grid
                item
                display={'flex'}
                flexDirection={isMobile ? 'column' : 'row'}
                alignItems={'start'}
                gap="20px"
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
                                    : undefined
                            }
                            label="Selecione o produto"
                            onChange={handleChange}
                        >
                            {productType === 'Device'
                                ? listDevice?.map((device: Device) => (
                                      <MenuItem value={device.seriesNumber}>{`${device.name} - ${device.seriesNumber}`}</MenuItem>
                                  ))
                                : listAccessories?.map((accessories: string) => <MenuItem value={accessories}>{accessories}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: '200px', width: '100%' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-multiple-checkbox-label">Forma de pagamento</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handleChangePayment}
                            input={<OutlinedInput label="Forma de pagamento" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {formPayment.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={personName.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">Valor da tarifa</InputLabel>
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
                {productType === 'Device' ? (
                    <Box sx={{ minWidth: '200px', width: '100%' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-checkbox-label">Brindes</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={gift}
                                onChange={handleChangeGift}
                                input={<OutlinedInput label="Brindes" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {listAccessories?.map((listAccessories) => (
                                    <MenuItem key={listAccessories} value={listAccessories}>
                                        <Checkbox checked={gift.indexOf(listAccessories) > -1} />
                                        <ListItemText primary={listAccessories} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                ) : (
                    <InputMask
                        mask="9999"
                        maskPlaceholder={null}
                        value={quantity ? quantity : undefined}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setQuantity(event.target.value)
                        }}
                    >
                        <TextField fullWidth id="outlined-basic" label="Quantidade" variant="outlined" />
                    </InputMask>
                )}
                <InputMask
                    mask="R$: 99999"
                    maskPlaceholder={null}
                    value={value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setValue(event.target.value)
                    }}
                    onBlur={() => {
                        if (Number(value.replace('R$: ', '')) < minValue!) {
                            setValue('')
                            setOpen(true)
                            setMessage(`Valor do produto é no mínimo R$${minValue} !`)
                            setTimeout(() => {
                                setOpen(false)
                            }, 2000)
                        }
                    }}
                >
                    <TextField fullWidth id="outlined-basic" label="Valor do produto" variant="outlined" />
                </InputMask>
            </Grid>
            {productType === 'Device' && (
                <>
                    <Grid container display={'flex'} gap={'20px'} style={{ marginTop: '20px', width: '100%' }}>
                        <div className="title">
                            <PeopleAltIcon sx={{ color: '#03082e', width: '30px', height: '30px' }} />
                            Detalhes do cliente
                        </div>
                    </Grid>
                    <Grid item display={'flex'} flexDirection={isMobile ? 'column' : 'row'} gap={'20px'} style={{ width: '100%' }}>
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
                    <Grid item display={'flex'} flexDirection={isMobile ? 'column' : 'row'} gap={'20px'} style={{ width: '100%' }}>
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
                    <Grid item display={'flex'} flexDirection={isMobile ? 'column' : 'row'} gap={'20px'} style={{ width: '100%' }}>
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
                        flexDirection={isMobile ? 'column' : 'row'}
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
                </>
            )}
            <Snackbars
                message={message}
                // eslint-disable-next-line no-constant-condition
                type={message !== 'Aparelho vendido com sucesso!' || 'Acessório vendido com sucesso!' ? 'error' : 'success'}
                open={open}
            />
            <Grid
                item
                display={'flex'}
                justifyContent={isMobile ? 'center' : 'end'}
                gap={'20px'}
                style={{ width: '100%', marginTop: '20px' }}
            >
                <Button
                    variant="contained"
                    sx={{
                        width: isMobile ? '100%' : '200px',
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
