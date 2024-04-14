/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Snackbars from '../../components/SnackBar'
import { useMedia } from '../../hooks/mediaQueryHook'
import InputMask from 'react-input-mask'
import Loading from '../../components/Loading'
import { formatarData } from '@/utils/formatterData'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

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

interface Column {
    id: 'client' | 'services' | 'barber' | 'value' | 'createdAt' | 'action'
    label: string
    minWidth?: number
    align?: 'right' | 'left' | 'center'
    format?: (value: number) => string
}

const columns: readonly Column[] = [
    { id: 'client', label: 'Nome do cliente', minWidth: 170, align: 'center' },
    { id: 'services', label: 'Serviços', minWidth: 170, align: 'center', format: (value: number) => value.toLocaleString('en-US') },
    {
        id: 'barber',
        label: 'Nome do barbeiro',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'value',
        label: 'Valor',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'createdAt',
        label: 'Data de inserção',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'action',
        label: 'Editar/Excluir',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
]

interface Data {
    client: string
    services: string
    barber: string
    value: string
    createdAt: string
}

function createData(client: string, services: string, barber: string, value: string, createdAt: string): Data {
    return {
        client,
        services,
        barber,
        value,
        createdAt,
    }
}

export default function InsertService() {
    const isMobile = useMedia('(max-width: 850px)')
    const [finish, setFinish] = useState(true)
    const [message, setMessage] = useState<string>('')
    const [open, setOpen] = useState(false)
    const [clientName, setClientName] = useState('')
    const [value, setValue] = useState('')
    const [barber, setBarber] = useState('')
    const [check, setCheck] = useState<boolean>(false)
    const [services, setServices] = useState<string[]>([])
    const [att, setAtt] = useState<boolean>(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [rows, setRows] = useState<Array<Data>>([
        {
            client: '',
            services: '',
            barber: '',
            value: '',
            createdAt: '',
        },
    ])
    const service = [
        'Corte',
        'Barba',
        'Sobrancelha',
        'Pigmentação ',
        'Relaxamento',
        'B-tox',
        'Progressiva',
        'Luzes',
        'Limpeza de pele',
        'Platinado',
        'Hidratação',
    ]

    const handleChangePage = (newPage: number) => {
        setPage(newPage)
    }

    console.log(rows)

    useEffect(() => {
        const fetchData = async () => {
            setFinish(false)
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URI}/services`)
                const formattedRows = response.data.map((data: any) => {
                    return createData(data.client, data.services.join(', '), data.barber, data.value, formatarData(data.createdAt))
                })

                setRows(formattedRows)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setFinish(true)
            }
        }

        fetchData()
    }, [att])

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const insertService = () => {
        setFinish(false)
        if (check) {
            axios
                .post(`${import.meta.env.VITE_API_URI}/services`, {
                    client: clientName,
                    value: Number(value.replace('R$: ', '')),
                    barber: barber,
                    services: services,
                })
                .then((res) => {
                    setMessage(res.data)
                    setOpen(true)
                    setClientName('')
                    setValue('')
                    setBarber('')
                    setServices([])
                    setTimeout(() => {
                        setOpen(false)
                        setAtt(!att)
                    }, 2000)
                })
                .finally(() => setFinish(true))
        }
    }

    useEffect(() => {
        if (clientName && barber && services.length > 0 && value) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    }, [clientName, barber, services, value])

    const handleChangeService = (event: SelectChangeEvent<typeof services>) => {
        const {
            target: { value },
        } = event
        setServices(typeof value === 'string' ? value.split(',') : value)
    }

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
                    label={'Nome do cliente'}
                    variant="outlined"
                    value={clientName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setClientName(event.target.value.toUpperCase())
                    }}
                />
                <Box sx={{ minWidth: '200px', width: '100%' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-multiple-checkbox-label">Serviço contratado</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={services}
                            onChange={handleChangeService}
                            input={<OutlinedInput label="Serviço contratado" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {service.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={services.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label={'Nome do barbeiro'}
                    variant="outlined"
                    value={barber}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setBarber(event.target.value.toUpperCase())
                    }}
                />
                <InputMask
                    mask={'99999'}
                    maskPlaceholder={null}
                    value={value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setValue(event.target.value)
                    }}
                >
                    <TextField fullWidth id="outlined-basic" label="Valor dos serviços" variant="outlined" />
                </InputMask>
                <Button
                    variant="contained"
                    sx={{
                        width: '70%',
                        backgroundColor: '#c5a400',
                        color: '#FFFF',
                    }}
                    disabled={check ? false : true}
                    onClick={insertService}
                >
                    Adicionar serviço
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
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                                        {columns.map((column) => {
                                            const value = row[column.id as keyof Data]
                                            return (
                                                <TableCell sx={{ fontSize: 16 }} key={column.id} align={column.align}>
                                                    {column.id === 'action' ? (
                                                        <>
                                                            <EditIcon onClick={() => null} style={{ cursor: 'pointer' }} />
                                                            <DeleteOutlineOutlinedIcon onClick={() => null} style={{ cursor: 'pointer' }} />
                                                        </>
                                                    ) : column.format && typeof value === 'number' ? (
                                                        column.format(value)
                                                    ) : (
                                                        value
                                                    )}
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
            <Snackbars message={message} type={message !== 'Serviços inserido com sucesso!' ? 'error' : 'success'} open={open} />
        </>
    )
}
