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
import { Accessories } from '../../model/Accessories'

interface Column {
    id: 'name' | 'value' | 'type' | 'quantity' | 'maxDiscountAmout' | 'createdAt' | 'status'
    label: string
    minWidth?: number
    align?: 'right' | 'left' | 'center'
    format?: (value: number) => string
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Nome do aparelho', minWidth: 170, align: 'center' },
    { id: 'value', label: 'Valor do aparelho', minWidth: 170, align: 'center' },
    {
        id: 'type',
        label: 'Tipo de aparelho',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'quantity',
        label: 'Quantidade',
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

interface Data {
    name: string
    value: number
    type: string
    quantity: number
    maxDiscountAmout: number
    createdAt: string
    status: string
}

function createData(
    name: string,
    value: number,
    type: string,
    quantity: number,
    maxDiscountAmout: number,
    createdAt: string,
    status: string
): Data {
    return {
        name,
        value,
        type,
        quantity,
        maxDiscountAmout,
        createdAt,
        status,
    }
}

export default function ViewStockAccesories() {
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [rows, setRows] = React.useState<Array<Accessories>>([
        {
            name: '',
            value: 0,
            type: '',
            quantity: 0,
            status: '',
            maxDiscountAmout: 0,
            createdAt: '',
        },
    ])

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URI}/accessories`)

                const formattedRows = response.data.map((data: Accessories) => {
                    return createData(
                        data.name,
                        data.value,
                        data.type,
                        data.quantity,
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
    }, [])

    const handleChangePage = (newPage: number) => {
        setPage(newPage)
    }

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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: Accessories) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    {columns.map((column) => {
                                        const value = row[column.id]
                                        return (
                                            <TableCell sx={{ fontSize: 16 }} key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number'
                                                    ? column.format(value)
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
    )
}
