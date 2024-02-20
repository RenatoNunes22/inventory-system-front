import { Button, Grid, InputAdornment, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Snackbars from '../../components/SnackBar'
import { useMedia } from '../../hooks/mediaQueryHook'
import InputMask from 'react-input-mask'
import Loading from '../../components/Loading'
import { countDecimalPlaces } from '../../utils/countDecimalPlaces'
import { formattValue } from '../../utils/formattValue'

type InsertProductProps = {
    productType: string
}

export default function InsertProduct({ productType }: InsertProductProps) {
    const isMobile = useMedia('(max-width: 850px)')
    const [quantity, setQuantity] = useState<string>('')
    const [finish, setFinish] = useState(true)
    const [message, setMessage] = useState<string>('')
    const [open, setOpen] = useState(false)
    const [nameDevice, setNameDevice] = useState('')
    const [value, setValue] = useState('')
    const [outputValue, setOutputValue] = useState('')
    const [type, setType] = useState('')
    const [seriesNumber, setSeriesNumber] = useState<string>('')
    const [status, setStatus] = useState('')
    const [stateBattery, setStateBattery] = useState<string>('')
    const [color, setColor] = useState<string>('')
    const [supplier, setSupplier] = useState<string>('')
    const [maxDiscountAmout, setMaxDiscountAmout] = useState<string>('')
    const [check, setCheck] = useState<boolean>(false)
    const [errorIn, setErrorIn] = useState<boolean>(false)
    const [errorOut, setErrorOut] = useState<boolean>(false)
    const [errorDiscount, setErrorDiscount] = useState<boolean>(false)

    const insertProduct = () => {
        setFinish(false)
        if (check) {
            if (productType === 'Device') {
                axios
                    .post(`${import.meta.env.VITE_API_URI}/device`, {
                        name: nameDevice,
                        inputValue: Number(formattValue(value)),
                        outputValue: Number(formattValue(outputValue)),
                        color: color,
                        supplier: supplier,
                        type: type,
                        seriesNumber: seriesNumber,
                        status: status,
                        stateBattery: stateBattery,
                        maxDiscountAmout: maxDiscountAmout ? Number(maxDiscountAmout.replace(/,/g, '.')) : 0,
                    })
                    .then((res) => {
                        setMessage(res.data), setOpen(true)
                        setNameDevice('')
                        setValue('')
                        setOutputValue('')
                        setType('')
                        setSeriesNumber('')
                        setStatus('')
                        setStateBattery('')
                        setColor('')
                        setSupplier('')
                        setMaxDiscountAmout('')
                    })
                    .finally(() => {
                        setFinish(true),
                            setTimeout(() => {
                                setOpen(false)
                            }, 2000)
                    })
            } else if (productType === 'Accessories') {
                axios
                    .post(`${import.meta.env.VITE_API_URI}/accessories`, {
                        name: nameDevice,
                        inputValue: Number(value.replace('R$: ', '')),
                        outputValue: Number(outputValue.replace('R$: ', '')),
                        type: type,
                        quantity: Number(quantity),
                        status: status,
                        maxDiscountAmout: maxDiscountAmout ? Number(maxDiscountAmout.replace('R$: ', '')) : 0,
                    })
                    .then((res) => {
                        setMessage(res.data)
                        setOpen(true)
                        setNameDevice('')
                        setValue('')
                        setOutputValue('')
                        setType('')
                        setQuantity('')
                        setStatus('')
                        setMaxDiscountAmout('')
                        setTimeout(() => {
                            setOpen(false)
                        }, 2000)
                    })
                    .finally(() => setFinish(true))
            }
        }
    }

    useEffect(() => {
        if (productType === 'Device' && nameDevice && value && seriesNumber) {
            setCheck(true)
        } else if (productType === 'Accessories' && nameDevice && value && quantity) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    }, [nameDevice, seriesNumber, value, quantity])

    return (
        <>
            {!finish && <Loading />}
            <Grid
                item
                display={'flex'}
                flexDirection={isMobile ? 'column' : 'row'}
                gap="20px"
                paddingTop={'20px'}
                style={{ width: '100%' }}
            >
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label={productType === 'Device' ? 'Nome do aparelho' : 'Nome do acessório'}
                    variant="outlined"
                    value={nameDevice}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setNameDevice(event.target.value.toUpperCase())
                    }}
                />

                <TextField
                    fullWidth
                    type="text"
                    id="outlined-basic"
                    label="Valor de entrada"
                    variant="outlined"
                    error={errorIn}
                    helperText={errorIn ? 'Valor com no máximo 2 casas decimais!' : undefined}
                    value={value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const regex = /^[0-9.,]*$/
                        if (!regex.test(event.target.value)) {
                            return ''
                        }
                        setValue(event.target.value)
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$:</InputAdornment>,
                    }}
                    onBlur={() => {
                        if (countDecimalPlaces(formattValue(value)) > 2) {
                            setErrorIn(true)
                        } else {
                            setErrorIn(false)
                        }
                    }}
                />
                <TextField
                    fullWidth
                    type="text"
                    id="outlined-basic"
                    label="Valor de saída"
                    variant="outlined"
                    error={errorOut ? true : false}
                    helperText={errorOut ? 'Valor com no máximo 2 casas decimais!' : undefined}
                    value={outputValue}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const regex = /^[0-9.,]*$/
                        if (!regex.test(event.target.value)) {
                            return ''
                        }
                        setOutputValue(event.target.value)
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$:</InputAdornment>,
                    }}
                    onBlur={() => {
                        if (countDecimalPlaces(formattValue(outputValue)) > 2) {
                            setErrorOut(true)
                        } else {
                            setErrorOut(false)
                            if (Number(formattValue(outputValue)) < Number(formattValue(value))) {
                                setMessage('Valor de saída deve ser maior que o valor de entrada!')
                                setOpen(true)
                                setOutputValue('')
                                setTimeout(() => {
                                    setOpen(false)
                                }, 2000)
                            }
                        }
                    }}
                />
            </Grid>

            <Grid item display={'flex'} flexDirection={isMobile ? 'column' : 'row'} gap={'20px'} style={{ width: '100%' }}>
                {productType === 'Device' ? (
                    <>
                        <InputMask
                            mask=""
                            maskPlaceholder={null}
                            value={seriesNumber}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setSeriesNumber(event.target.value.toUpperCase())
                            }}
                        >
                            <TextField fullWidth id="outlined-basic" label="Número de série" variant="outlined" />
                        </InputMask>
                        <InputMask
                            mask={'999'}
                            maskPlaceholder={null}
                            value={stateBattery}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setStateBattery(event.target.value.toUpperCase())
                            }}
                        >
                            <TextField
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                }}
                                fullWidth
                                id="outlined-basic"
                                label="Saúde da bateria"
                                variant="outlined"
                            />
                        </InputMask>
                    </>
                ) : (
                    <InputMask
                        mask={'99999'}
                        maskPlaceholder={null}
                        value={quantity}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setQuantity(event.target.value.toUpperCase())
                        }}
                    >
                        <TextField fullWidth id="outlined-basic" label="Quantidade" variant="outlined" />
                    </InputMask>
                )}
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Tipo do aparelho"
                    variant="outlined"
                    value={type}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setType(event.target.value.toUpperCase())
                    }}
                />
            </Grid>
            <Grid item display={'flex'} flexDirection={isMobile ? 'column' : 'row'} gap={'20px'} style={{ width: '100%' }}>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label={'Cor'}
                    variant="outlined"
                    value={color}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setColor(event.target.value.toUpperCase())
                    }}
                />
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label={'Fornecedor'}
                    variant="outlined"
                    value={supplier}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSupplier(event.target.value.toUpperCase())
                    }}
                />

                <TextField
                    fullWidth
                    type="text"
                    error={errorDiscount ? true : false}
                    helperText={errorDiscount ? 'Valor com no máximo 2 casas decimais!' : undefined}
                    id="outlined-basic"
                    label="Desconto máximo"
                    variant="outlined"
                    value={maxDiscountAmout}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const regex = /^[0-9.,]*$/
                        if (!regex.test(event.target.value)) {
                            return ''
                        }
                        setMaxDiscountAmout(event.target.value)
                    }}
                    onBlur={() => {
                        if (countDecimalPlaces(formattValue(maxDiscountAmout)) > 2) {
                            setErrorDiscount(true)
                        } else {
                            setErrorDiscount(false)
                            if (Number(formattValue(outputValue)) < Number(formattValue(maxDiscountAmout))) {
                                setMessage('Valor de saída deve ser maior que o valor de entrada!')
                                setOpen(true)
                                setMaxDiscountAmout('')
                                setTimeout(() => {
                                    setOpen(false)
                                }, 2000)
                            }
                        }
                    }}
                />
            </Grid>
            <Grid item display={'flex'} flexDirection={isMobile ? 'column' : 'row'} gap={'20px'} style={{ width: '100%' }}>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Status"
                    variant="outlined"
                    value={status}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setStatus(event.target.value.toUpperCase().toUpperCase())
                    }}
                />
            </Grid>
            <Snackbars message={message} type={message !== 'Produto inserido com sucesso!' ? 'error' : 'success'} open={open} />
            <Button
                variant="contained"
                sx={{
                    width: isMobile ? '100%' : '200px',
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
