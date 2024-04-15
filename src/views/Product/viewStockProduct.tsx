import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import axios from 'axios'
import { formatarData } from '../../utils/formatterData'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { Box, Button, Grid, TextField } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import SearchIcon from '@mui/icons-material/Search'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useMedia } from '../../hooks/mediaQueryHook'
import Loading from '../../components/Loading'
import { Product } from '../../model/Product'

interface Column {
    id: 'name' | 'inputValue' | 'quantity' | 'status' | 'createdAt'
    label: string
    minWidth?: number
    align?: 'right' | 'left' | 'center'
    format?: (value: number) => string
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Nome do aparelho', minWidth: 170, align: 'center' },
    { id: 'inputValue', label: 'Valor do aparelho', minWidth: 170, align: 'center' },
    {
        id: 'quantity',
        label: 'Quantidade',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'createdAt',
        label: 'Data de inserção',
        minWidth: 170,
        align: 'center',
    },
]

function createData(name: string, inputValue: number, outputValue: number, quantity: number, status: string, createdAt: string): Product {
    return {
        name,
        inputValue,
        outputValue,
        quantity,
        status,
        createdAt,
    }
}

export default function ViewStockProduct() {
    const [search, setSearch] = React.useState('')
    const isMobile = useMedia('(max-width: 1150px)')
    const [finish, setFinish] = React.useState(true)
    const [dispach, setDispach] = React.useState(true)
    const [date, setDate] = React.useState<Dayjs | null>(null)
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [rows, setRows] = React.useState<Array<Product>>([
        {
            name: '',
            inputValue: 0,
            outputValue: 0,
            quantity: 0,
            status: '',
            createdAt: '',
        },
    ])

    React.useEffect(() => {
        const fetchData = async () => {
            setFinish(false)
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URI}/product`)

                const formattedRows = response.data.map((data: Product) => {
                    return createData(
                        data.name,
                        data.inputValue,
                        data.outputValue,
                        data.quantity,
                        data.status,
                        formatarData(data.createdAt)
                    )
                })

                setRows(formattedRows)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setFinish(true)
            }
        }

        fetchData()
    }, [dispach])

    const handleChangePage = (newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleFilterDevices = async () => {
        setFinish(false)
        try {
            if (!search || !date) {
                const response = await axios.get(`${import.meta.env.VITE_API_URI}/filterProduct/data`, {
                    params: {
                        name: search ? search : undefined,
                        date: date ? date?.format('YYYY-MM-DD') : undefined,
                    },
                })
                const formattedRows = response.data.map((data: Product) => {
                    return createData(
                        data.name,
                        data.inputValue,
                        data.outputValue,
                        data.quantity,
                        data.status,
                        formatarData(data.createdAt)
                    )
                })

                setRows(formattedRows)
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setFinish(true)
        }
    }

    return (
        <>
            {!finish && <Loading />}
            <Grid
                container={true}
                display={'flex'}
                direction={isMobile ? 'column' : 'row'}
                alignItems={'end'}
                justifyContent={'start'}
                xs={12}
                lg={12}
                xl={12}
                gap={1}
            >
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Nome do produto"
                    variant="outlined"
                    value={search}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSearch(event.target.value)
                    }}
                    sx={{ width: isMobile ? '100%' : '20%' }}
                />
                <Box sx={{ width: isMobile ? '100%' : null }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker disableFuture={true} format="DD/MM/YYYY" value={date} onChange={setDate} label="Seleciona o dia" />
                        </DemoContainer>
                    </LocalizationProvider>
                </Box>
                <Button
                    onClick={handleFilterDevices}
                    sx={{
                        backgroundColor: '#01153a',
                        color: '#fff',
                        height: '56px',
                        px: '15px',
                        ':hover': { backgroundColor: '#010101' },
                        gap: '5px',
                        width: isMobile ? '100%' : null,
                    }}
                >
                    <SearchIcon />
                    BUSCAR
                </Button>
                <Button
                    onClick={() => {
                        setSearch('')
                        setDate(null)
                        setDispach(!dispach)
                    }}
                    sx={{
                        backgroundColor: '#01153a',
                        color: '#fff',
                        height: '56px',
                        px: '15px',
                        ':hover': { backgroundColor: '#010101' },
                        gap: '5px',
                        width: isMobile ? '100%' : null,
                    }}
                >
                    <DeleteForeverIcon />
                    LIMPAR
                </Button>
            </Grid>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        sx={{
                                            backgroundColor: '#e0e0e0',
                                            color: '#000',
                                            fontSize: 18,
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: Product) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1}>
                                        {columns.map((column) => {
                                            const value = row[column.id]
                                            return (
                                                <TableCell sx={{ fontSize: 16 }} key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={() => handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    )
}
