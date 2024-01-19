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
import { formatarData } from '../../utils/formatterData'
import { User } from '../../model/User'

interface Column {
    id: 'email' | 'cpf' | 'name' | 'dn' | 'role' | 'telephone' | 'productSold' | 'createdAt'
    label: string
    minWidth?: number
    align?: 'right' | 'left' | 'center'
    format?: (value: number) => string
}

const columns: readonly Column[] = [
    { id: 'email', label: 'Email', minWidth: 170, align: 'center' },
    { id: 'cpf', label: 'CPF', minWidth: 170, align: 'center' },
    {
        id: 'name',
        label: 'Nome',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'dn',
        label: 'Data de nascimento',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'role',
        label: 'Permissão',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'telephone',
        label: 'Telefone',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'productSold',
        label: 'Total de vendas',
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
]

interface Data {
    email: string
    cpf: string
    name: string
    dn: string
    role: string
    telephone: string
    productSold: string
    createdAt: string
}

function createData(
    email: string,
    cpf: string,
    name: string,
    dn: string,
    role: string,
    telephone: string,
    productSold: string,
    createdAt: string
): Data {
    return {
        email,
        cpf,
        name,
        dn,
        role,
        telephone,
        productSold,
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

export default function ViewStockUser() {
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [rows, setRows] = React.useState<Array<any>>([
        {
            email: '',
            cpf: '',
            name: '',
            dn: '',
            role: 0,
            telephone: '',
            createdAt: '',
            productSold: '',
            password: '',
        },
    ])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URI}/users`)
                const formattedRows = response.data.map((data: User) => {
                    return createData(
                        data.email,
                        data.cpf,
                        data.name,
                        data.dn,
                        data.role === 1 ? 'Administrador' : 'Funcionário',
                        data.telephone,
                        data.productSold.length.toString(),
                        formatarData(data.createdAt)
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
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.cpf}>
                                    {columns.map((column) => {
                                        const value = row[column.id]
                                        console.log(row.productSold)
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
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
