import { Button, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Snackbars from '../../components/SnackBar'

type InsertProductProps = {
    productType: string
}

export default function InsertProduct({ productType }: InsertProductProps) {
    const [quantity, setQuantity] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [open, setOpen] = useState(false)
    const [nameDevice, setNameDevice] = useState('')
    const [value, setValue] = useState('')
    const [type, setType] = useState('')
    const [seriesNumber, setSeriesNumber] = useState<string>('')
    const [status, setStatus] = useState('')
    const [stateBattery, setStateBattery] = useState<string>('')
    const [maxDiscountAmout, setMaxDiscountAmout] = useState<string>('')
    const [check, setCheck] = useState<boolean>(false)

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
                        setOpen(true)
                        setTimeout(() => {
                            setOpen(false)
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
                        setOpen(true)
                        setTimeout(() => {
                            setOpen(false)
                            window.location.reload()
                        }, 2000)
                    })
            }
        }
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

    return (
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
                {/* <TextField
                    fullWidth
                    required
                    id="outlined-basic"
                    label="Valor do aparelho"
                    variant="outlined"
                    value={value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setValue(event.target.value)
                    }}
                /> */}
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
            <Snackbars
                message={message}
                type={message !== 'Produto inserido com sucesso!' ? 'error' : 'success'}
                open={open}
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
    )
}
