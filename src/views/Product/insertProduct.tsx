import { Button, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Snackbars from '../../components/SnackBar'
import { useMedia } from '../../hooks/mediaQueryHook'
import InputMask from 'react-input-mask'
import Loading from '../../components/Loading'
import { formattValue } from '../../utils/formattValue'
import { NumericFormat } from 'react-number-format'

export default function InsertProduct() {
    const isMobile = useMedia('(max-width: 850px)')
    const [quantity, setQuantity] = useState<string>('')
    const [finish, setFinish] = useState(true)
    const [message, setMessage] = useState<string>('')
    const [open, setOpen] = useState(false)
    const [nameProduct, setNameProduct] = useState('')
    const [value, setValue] = useState('')
    const [outputValue, setOutputValue] = useState('')
    const [status, setStatus] = useState('')
    const [check, setCheck] = useState<boolean>(false)
    const [focusIn, setFocusIn] = useState<boolean>(false)
    const [focusOut, setFocusOut] = useState<boolean>(false)

    const borderColor = '#c4c4c4'
    const borderColorFocus = '#102bc0'
    const backgroundColor = '#ffffff'
    const fontSize = '16px'
    const height = '55px'
    const width = isMobile ? '100%' : '95%'

    const styleEntry = {
        border: `${focusIn ? 2 : 1}px solid ${focusIn ? borderColorFocus : borderColor}`,
        borderRadius: '4px',
        backgroundColor,
        color: '#000000',
        padding: '5px 15px',
        fontSize,
        height,
        width,
    }

    const styleExit = {
        border: `${focusOut ? 2 : 1}px solid ${focusOut ? borderColorFocus : borderColor}`,
        borderRadius: '4px',
        backgroundColor,
        padding: '5px 15px',
        color: '#000000',
        fontSize,
        height,
        width,
    }

    const insertProduct = () => {
        setFinish(false)
        if (check) {
            axios
                .post(`${import.meta.env.VITE_API_URI}/accessories`, {
                    name: nameProduct,
                    inputValue: Number(value.replace('R$: ', '')),
                    outputValue: Number(outputValue.replace('R$: ', '')),
                    quantity: Number(quantity),
                    status: status,
                })
                .then((res) => {
                    setMessage(res.data)
                    setOpen(true)
                    setNameProduct('')
                    setValue('')
                    setOutputValue('')
                    setQuantity('')
                    setStatus('')
                    setTimeout(() => {
                        setOpen(false)
                    }, 2000)
                })
                .finally(() => setFinish(true))
        }
    }

    const BlueCheckValue = () => {
        setFocusOut(false)
        if (Number(formattValue(outputValue)) < Number(formattValue(value))) {
            setMessage('Valor de saída deve ser maior que o valor de entrada!')
            setOpen(true)
            setOutputValue('')
            setTimeout(() => {
                setOpen(false)
            }, 2000)
        }
    }

    useEffect(() => {
        if (nameProduct && value && quantity) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    }, [nameProduct, value, quantity])

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
                    label={'Nome do produto'}
                    variant="outlined"
                    value={nameProduct}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setNameProduct(event.target.value.toUpperCase())
                    }}
                />
                <NumericFormat
                    style={styleEntry}
                    value={value}
                    thousandSeparator="."
                    onFocus={() => setFocusIn(true)}
                    onBlur={() => setFocusIn(false)}
                    decimalSeparator=","
                    decimalScale={2}
                    prefix="R$ "
                    placeholder="Valor de entrada"
                    allowNegative={false}
                    onValueChange={(values) => {
                        setValue(values.formattedValue)
                    }}
                />
                <NumericFormat
                    style={styleExit}
                    value={outputValue}
                    thousandSeparator="."
                    onFocus={() => setFocusOut(true)}
                    onBlur={BlueCheckValue}
                    decimalSeparator=","
                    decimalScale={2}
                    prefix="R$ "
                    placeholder="Valor de saída"
                    allowNegative={false}
                    onValueChange={(values) => {
                        setOutputValue(values.formattedValue)
                    }}
                />
            </Grid>

            <Grid item display={'flex'} flexDirection={isMobile ? 'column' : 'row'} gap={'20px'} style={{ width: '100%' }}>
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
