import * as React from 'react'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'
import { formatarData } from '../../utils/formatterData'
import { Product } from '../../model/Product'
import Snackbars from '../../components/SnackBar'
import { useMedia } from '../../hooks/mediaQueryHook'

export default function DeleteProduct() {
    const isMobile = useMedia('(max-width: 850px)')
    const [listProduct, setListProduct] = React.useState<Product[]>()
    const [search, setSearch] = React.useState<number | string>('')
    const [product, setProduct] = React.useState<Product>()
    const [newNameProduct, setNewNameProduct] = React.useState<string | undefined>()
    const [newValueProduct, setNewValueProduct] = React.useState<string | undefined>()
    const [newTypeProduct, setNewTypeProduct] = React.useState<string | undefined>()
    const [newStatusProduct, setNewStatusProduct] = React.useState<string | undefined>()
    const [newCreatedAtProduct, setNewCreatedAtProduct] = React.useState<string | undefined>()
    const [newQuantityProduct, setNewQuantityProduct] = React.useState<string | undefined>()
    const [message, setMessage] = React.useState<string>('')
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        setProduct(undefined)
    }, [search])

    const searchProduct = () => {
        axios
            .get(`${import.meta.env.VITE_API_URI}/product/${search}`)
            .then((res) => setDataProduct(res.data[0]))
            .catch((err) => console.log(err))
    }

    const deleteProduct = () => {
        axios
            .delete(`${import.meta.env.VITE_API_URI}/product/${search}`)
            .then((res) => {
                setMessage(res.data)
                setOpen(true)
                setTimeout(() => {
                    setProduct(undefined)
                    setOpen(false)
                    setNewNameProduct('')
                    searchProduct()
                }, 2000)
            })
            .catch((err) => console.log(err))
    }

    const setDataProduct = (product: Product) => {
        setProduct(product)
        setNewNameProduct(product.name)
        setNewValueProduct(String(product.inputValue))
        setNewStatusProduct(product.status)
        setNewCreatedAtProduct(formatarData(product.createdAt))
        setNewQuantityProduct(String(product.quantity))
    }

    const handleChange = (event: SelectChangeEvent) => {
        setSearch(event.target.value)
    }

    React.useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URI}/product`)
            .then((res) => setListProduct(res.data))
            .catch((err) => console.log(err))
    }, [])

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
                            {listProduct?.map((product: Product) => (
                                <MenuItem value={product.name}>{product.name}</MenuItem>
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
            {product && (
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
                    <Snackbars message={message} type={message !== 'Produto deletado com sucesso!' ? 'error' : 'success'} open={open} />
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
