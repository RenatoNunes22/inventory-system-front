import {
    Box,
    Button,
    Checkbox,
    FormControl,
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
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { Client } from '../../model/Client'
import InputMask from 'react-input-mask'
import { useMedia } from '../../hooks/mediaQueryHook'
import Loading from '../../components/Loading'
import { countDecimalPlaces } from '../../utils/countDecimalPlaces'
import { formattValue } from '../../utils/formattValue'
import { Product } from '../../model/Product'

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

export default function SoldProduct() {
    const isMobile = useMedia('(max-width: 1220px)')
    const [finish, setFinish] = useState(true)
    const [listProduct, setListProduct] = useState<Array<string>>()
    const [search, setSearch] = useState<number | string>('')
    const [seletedProduct, setSeletedProduct] = useState<Product>()
    const [errorValue, setErrorValue] = useState<boolean>(false)

    //CLIENT
    const [selectedClient, setSelectedClient] = useState<Client>()
    const [nameClient, setNameClient] = useState('')
    const [email, setEmail] = useState<string>('')
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
        setFinish(false)
        axios
            .get(`${import.meta.env.VITE_API_URI}/product/`)
            .then((res) => {
                setListProduct(res.data)
            })
            .finally(() => {
                setFinish(true)
            })
    }, [open])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URI}/product/${search}`).then((res) => {
            setSeletedProduct(res.data[0])
        })
    }, [search])

    useEffect(() => {
        if (seletedProduct) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    }, [seletedProduct])

    const soldProduct = () => {
        setFinish(false)
        axios
            .post(`${import.meta.env.VITE_API_URI}/product`, {
                name: seletedProduct?.name,
                soldValue: Number(formattValue(value)),
                formPayment: personName,
                quantity: Number(quantity),
                status: seletedProduct?.status,
                payment: personName,
            })
            .then((res) => {
                setMessage(res.data)
                setOpen(true)
                if (res.data === 'Produto vendido com sucesso!') {
                    clearState()
                }
            })
            .finally(() => {
                setFinish(true)
                setTimeout(() => {
                    setOpen(false)
                })
            })
    }

    const checkMessage = () => {
        if (message === 'Produto vendido com sucesso!') {
            return true
        } else {
            return false
        }
    }

    const clearState = () => {
        setSeletedProduct(undefined)
        setValue('')
        setCPF('')
        setEmail('')
        setNameClient('')
        setDn('')
        setPhone('')
        setCep('')
        setState('')
        setCity('')
        setNeighborhood('')
        setStreet('')
        setNumber('')
        setComplement('')
        setPersonName([])
        setQuantity('')
    }

    const makeSale = () => {
        soldProduct()
    }

    return (
        <>
            {!finish && <Loading />}
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
                            value={seletedProduct?.name}
                            label="Selecione o produto"
                            onChange={handleChange}
                        >
                            {listProduct?.map((accessories: string) => (
                                <MenuItem value={accessories}>{accessories}</MenuItem>
                            ))}
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
                <InputMask
                    mask="9999"
                    maskPlaceholder={null}
                    value={quantity}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setQuantity(event.target.value)
                    }}
                >
                    <TextField fullWidth id="outlined-basic" label="Quantidade" variant="outlined" />
                </InputMask>

                <TextField
                    fullWidth
                    type="text"
                    id="outlined-basic"
                    label="Valor do produto"
                    variant="outlined"
                    error={errorValue}
                    helperText={errorValue ? 'Valor com no máximo 2 casas decimais!' : undefined}
                    value={value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const regex = /^[0-9.,]*$/
                        if (!regex.test(event.target.value)) {
                            return ''
                        }
                        setValue(event.target.value)
                    }}
                    onBlur={() => {
                        if (countDecimalPlaces(formattValue(value)) > 2) {
                            setErrorValue(true)
                        } else {
                            setErrorValue(false)
                        }
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$:</InputAdornment>,
                    }}
                />
            </Grid>

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
                        value={selectedClient?.email ? selectedClient.email : email}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(event.target.value)
                        }}
                    />
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Nome do cliente"
                        variant="outlined"
                        value={selectedClient?.name ? selectedClient.name : nameClient}
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
                        value={selectedClient?.telephone ? selectedClient.telephone : phone}
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

            <Snackbars message={message} type={checkMessage() ? 'success' : 'error'} open={open} />
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
