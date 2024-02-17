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
import { Device } from '../../model/Device'
import { formatarData } from '../../utils/formatterData'
import { Button, Grid, TextField } from '@mui/material'
import InputMask from 'react-input-mask'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { Dayjs } from 'dayjs'
import SearchIcon from '@mui/icons-material/Search'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

interface Column {
    id:
        | 'name'
        | 'inputValue'
        | 'outputValue'
        | 'seriesNumber'
        | 'color'
        | 'supplier'
        | 'type'
        | 'stateBattery'
        | 'maxDiscountAmout'
        | 'createdAt'
        | 'status'
    label: string
    minWidth?: number
    align?: 'right' | 'left' | 'center'
    format?: (value: number) => string
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Nome do aparelho', minWidth: 170, align: 'center' },
    { id: 'inputValue', label: 'Valor de entrada', minWidth: 170, align: 'center' },
    { id: 'outputValue', label: 'Valor de saída', minWidth: 170, align: 'center' },
    {
        id: 'seriesNumber',
        label: 'Numero de série',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'color',
        label: 'Cor',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'supplier',
        label: 'Fornecedor',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'type',
        label: 'Tipo de aparelho',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },

    {
        id: 'stateBattery',
        label: 'Estado da bateria',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'maxDiscountAmout',
        label: 'Maximo desconto disponivel',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'createdAt',
        label: 'Data de inserção',
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
]

function createData(
    name: string,
    inputValue: number,
    outputValue: number,
    color: string,
    supplier: string,
    type: string,
    seriesNumber: string,
    stateBattery: number,
    maxDiscountAmout: number,
    createdAt: string,
    status: string
): Device {
    return {
        name,
        inputValue,
        outputValue,
        color,
        supplier,
        type,
        seriesNumber,
        stateBattery,
        maxDiscountAmout,
        createdAt,
        status,
    }
}

//const token = localStorage.getItem('token')

// const config = {
//     headers: {
//         Authorization: `Bearer ${token}`,
//     },
// }

// const rows = await axios
//     .get(`${import.meta.env.VITE_API_URI}/devices`, config)
//     .then((res) =>
//         res.data.map((data: Device) =>
//             createData(
//                 data.name,
//                 data.value,
//                 data.type,
//                 data.seriesNumber,
//                 data.stateBattery,
//                 data.maxDiscountAmout,
//                 formatarData(data.createdAt),
//                 data.status
//             )
//         )
//     )

export default function ViewStockDevice() {
    const [page, setPage] = React.useState(0)
    const [dispach, setDispach] = React.useState(true)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [search, setSearch] = React.useState('')
    const [date, setDate] = React.useState<Dayjs | null>(null)
    const [seriesNumber, setSeriesNumber] = React.useState('')
    const [rows, setRows] = React.useState<Array<Device>>([
        {
            name: '',
            inputValue: 0,
            outputValue: 0,
            color: '',
            supplier: '',
            type: '',
            seriesNumber: '',
            status: '',
            stateBattery: 0,
            maxDiscountAmout: 0,
            createdAt: '',
        },
    ])

    const handleChangePage = (newPage: number) => {
        setPage(newPage)
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URI}/devices`)

                const formattedRows = response.data.map((data: Device) => {
                    return createData(
                        data.name,
                        data.inputValue,
                        data.outputValue,
                        data.color,
                        data.supplier,
                        data.type,
                        data.seriesNumber,
                        data.stateBattery,
                        data.maxDiscountAmout,
                        formatarData(data.createdAt),
                        data.status
                    )
                })

                setRows(formattedRows)
            } catch (error) {
                console.error('Error fetching data:', error)
                // Trate o erro conforme necessário
            }
        }

        fetchData()
    }, [dispach])

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleFilterDevices = async () => {
        try {
            if (!search || !date || !seriesNumber) {
                const response = await axios.get(`${import.meta.env.VITE_API_URI}/filterDevice/data`, {
                    params: {
                        name: search ? search : undefined,
                        date: date ? date?.format('YYYY-MM-DD') : undefined,
                        numberSeries: seriesNumber ? seriesNumber : undefined,
                    },
                })
                const formattedRows = response.data.map((data: Device) => {
                    return createData(
                        data.name,
                        data.inputValue,
                        data.outputValue,
                        data.color,
                        data.supplier,
                        data.type,
                        data.seriesNumber,
                        data.stateBattery,
                        data.maxDiscountAmout,
                        formatarData(data.createdAt),
                        data.status
                    )
                })

                setRows(formattedRows)
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    return (
        <>
            <Grid
                container={true}
                display={'flex'}
                direction={'row'}
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
                        setSearch(event.target.value.toUpperCase())
                    }}
                    sx={{ width: '20%' }}
                />
                <InputMask
                    mask="9999999999"
                    maskPlaceholder={null}
                    value={seriesNumber}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSeriesNumber(event.target.value)
                    }}
                >
                    <TextField fullWidth id="outlined-basic" label="Número de série" variant="outlined" sx={{ width: '20%' }} />
                </InputMask>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker disableFuture={true} format="DD/MM/YYYY" value={date} onChange={setDate} label="Seleciona o dia" />
                    </DemoContainer>
                </LocalizationProvider>

                <Button
                    onClick={handleFilterDevices}
                    sx={{
                        backgroundColor: '#01153a',
                        color: '#fff',
                        height: '56px',
                        px: '15px',
                        ':hover': { backgroundColor: '#010101' },
                        gap: '5px',
                    }}
                >
                    <SearchIcon />
                    BUSCAR
                </Button>
                <Button
                    onClick={() => {
                        setDispach(!dispach)
                        setSearch('')
                        setSeriesNumber('')
                        setDate(null)
                    }}
                    sx={{
                        backgroundColor: '#01153a',
                        color: '#fff',
                        height: '56px',
                        px: '15px',
                        ':hover': { backgroundColor: '#010101' },
                        gap: '5px',
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
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: Device) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.seriesNumber}>
                                        {columns.map((column) => {
                                            const value = row[column.id]
                                            return (
                                                <TableCell sx={{ fontSize: 16 }} key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : column.id === 'inputValue'
                                                        ? `R$${value}`
                                                        : column.id === 'outputValue'
                                                        ? `R$${value}`
                                                        : column.id === 'stateBattery'
                                                        ? `${value}%`
                                                        : value}
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
