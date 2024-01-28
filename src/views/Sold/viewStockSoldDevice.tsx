/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { SoldDevice } from '../../model/SoldDevice'
import { formatarData } from '../../utils/formatterData'

interface Column {
    id:
        | 'name'
        | 'soldValue'
        | 'seriesNumber'
        | 'gift'
        | 'expenses'
        | 'fees'
        | 'formPayment'
        | 'client'
        | 'seller'
        | 'createdAt'
    label: string
    minWidth?: number
    align?: 'right' | 'left' | 'center'
    format?: (value: number) => string
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Nome do produto', minWidth: 170, align: 'center' },
    { id: 'soldValue', label: 'Valor da venda', minWidth: 170, align: 'center' },
    {
        id: 'seriesNumber',
        label: 'Numero de serie',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'gift',
        label: 'Brinde',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'expenses',
        label: 'Despesas',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'fees',
        label: 'Tarifas',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'formPayment',
        label: 'Forma de pagamento',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'client',
        label: 'Cliente',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'seller',
        label: 'Vendedor',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'createdAt',
        label: 'Data da venda',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
]

function createData(
    name: string,
    soldValue: string,
    seriesNumber: string,
    gift: string,
    expenses: string,
    fees: string,
    formPayment: string,
    client: string,
    seller: string,
    createdAt: string
): SoldDevice {
    return {
        name,
        soldValue,
        seriesNumber,
        gift,
        expenses,
        fees,
        formPayment,
        client,
        seller,
        createdAt,
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

export default function ViewStockSoldDevice() {
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [rows, setRows] = React.useState<Array<any>>([
        {
            name: '',
            soldValue: '',
            seriesNumber: '',
            gift: '',
            expenses: '',
            fees: '',
            formPayment: '',
            client: '',
            seller: '',
        },
    ])

    const handleChangePage = (newPage: number) => {
        setPage(newPage)
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URI}/sold`)
                console.log(response.data)
                const formattedRows = response.data.map((data: SoldDevice) => {
                    return createData(
                        data.name,
                        data.soldValue,
                        data.seriesNumber,
                        data.gift,
                        data.expenses,
                        data.fees,
                        data.formPayment,
                        data.client,
                        data.seller,
                        formatarData(data.createdAt)
                    )
                })

                setRows(formattedRows)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.seriesNumber}>
                                    {columns.map((column) => {
                                        const value = row[column.id]
                                        return (
                                            <TableCell sx={{ fontSize: 16 }} key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number'
                                                    ? column.format(value)
                                                    : value
                                                    ? value
                                                    : '-'}
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
    )
}
