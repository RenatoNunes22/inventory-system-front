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
    Modal,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import BackspaceIcon from '@mui/icons-material/Backspace'
import TableRowsIcon from '@mui/icons-material/TableRows'

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
    id: '_id' | 'client' | 'services' | 'barber' | 'value' | 'createdAt' | 'action'
    label: string
    minWidth?: number
    align?: 'right' | 'left' | 'center'
    format?: (value: number) => string
}

const columns: readonly Column[] = [
    { id: '_id', label: 'id', minWidth: 0, align: 'center' },
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
    _id: string
    client: string
    services: string
    barber: string
    value: string
    createdAt: string
}

function createData(_id: string, client: string, services: string, barber: string, value: string, createdAt: string): Data {
    return {
        _id,
        client,
        services,
        barber,
        value,
        createdAt,
    }
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
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
    const [openEdit, setOpenEdit] = useState(false)
    const [rowSelected, setRowSelected] = useState<Data>()
    const [isFilter, setIsFilter] = useState<boolean>(false)

    //EditService
    const [clientNameEdit, setClientNameEdit] = useState('')
    const [valueEdit, setValueEdit] = useState('')
    const [barberEdit, setBarberEdit] = useState('')
    const [servicesEdit, setServiceEdit] = useState<string[]>([])

    //Filter
    const [clientNameFilter, setClientNameFilter] = useState('')
    const [barberFilter, setBarberFilter] = useState('')
    const [date, setDate] = useState<Dayjs | null>(dayjs())

    const [rows, setRows] = useState<Array<Data>>([
        {
            _id: '',
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

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleOpenEdit = (row: Data) => {
        setOpenEdit(true), setRowSelected(row)
    }
    const handleCloseEdit = () => setOpenEdit(false)

    useEffect(() => {
        const fetchData = async () => {
            setFinish(false)
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URI}/services`)
                const formattedRows = response.data.map((data: any) => {
                    return createData(
                        data._id,
                        data.client,
                        data.services.join(', '),
                        data.barber,
                        data.value,
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
                .catch((error) => {
                    setFinish(true)
                    console.error('Error fetching data:', error)
                })
                .finally(() => setFinish(true))
        }
    }

    const DeleteService = (_id: string) => {
        axios
            .delete(`${import.meta.env.VITE_API_URI}/services/${_id}`)
            .then((res) => {
                setMessage(res.data)
                setOpen(true)
                setTimeout(() => {
                    setOpen(false)
                    setAtt(!att)
                }, 2000)
            })
            .catch((error) => {
                setFinish(true)
                console.error('Error fetching data:', error)
            })
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

    const handleChangeServiceEdit = (event: SelectChangeEvent<typeof services>) => {
        const {
            target: { value },
        } = event
        setServiceEdit(typeof value === 'string' ? value.split(',') : value)
    }

    const checkMessage = (message: string) => {
        switch (message) {
            case 'Serviço inserido com sucesso!':
                return 'success'
            case 'Serviço deletado com sucesso!':
                return 'success'
            case 'Serviço atualizado com sucesso!':
                return 'success'
            default:
                return 'error'
        }
    }

    const EditService = () => {
        setFinish(false)
        axios
            .put(`${import.meta.env.VITE_API_URI}/services/${rowSelected?._id}`, {
                client: clientNameEdit ? clientNameEdit : rowSelected?.client,
                value: Number(valueEdit) ? Number(valueEdit) : rowSelected?.value,
                barber: barberEdit ? barberEdit : rowSelected?.barber,
                services: servicesEdit ? servicesEdit : rowSelected?.services.split(', '),
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
                    handleCloseEdit()
                }, 2000)
            })
            .catch((error) => {
                setFinish(true)
                console.error('Error fetching data:', error)
            })
            .finally(() => setFinish(true))
    }

    const filterService = async () => {
        setFinish(false)
        await axios
            .get(`${import.meta.env.VITE_API_URI}/filterServices/data`, {
                params: {
                    client: clientNameFilter ? clientNameFilter : undefined,
                    barber: barberFilter ? barberFilter : undefined,
                    date: date ? date?.format('YYYY-MM-DD') : undefined,
                },
            })
            .then((res) => {
                const formattedRows = res.data.map((data: any) => {
                    return createData(
                        data._id,
                        data.client,
                        data.services.join(', '),
                        data.barber,
                        data.value,
                        formatarData(data.createdAt)
                    )
                })
                setRows(formattedRows)
            })
            .catch((error) => {
                setFinish(true)
                console.error('Error fetching data:', error)
            })
            .finally(() => setFinish(true))
    }

    const clearFilter = () => {
        setClientNameFilter('')
        setBarberFilter('')
        setDate(null)
        setAtt(!att)
    }

    const EditModal = () => {
        const serviceSelected = rowSelected?.services.split(', ')
        return (
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
                    value={clientNameEdit ? clientNameEdit : rowSelected?.client}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setClientNameEdit(event.target.value.toUpperCase())
                    }}
                />
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label={'Nome do barbeiro'}
                    variant="outlined"
                    value={barberEdit ? barberEdit : rowSelected?.barber}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setBarberEdit(event.target.value.toUpperCase())
                    }}
                />
                <Box sx={{ minWidth: '200px', width: '100%' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-multiple-checkbox-label">Serviço contratado</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={servicesEdit.length > 0 ? servicesEdit : serviceSelected}
                            onChange={handleChangeServiceEdit}
                            input={<OutlinedInput label="Serviços contratados" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {service.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={servicesEdit.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label={'Valor do serviço'}
                    type="number"
                    variant="outlined"
                    value={valueEdit ? valueEdit : rowSelected?.value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setValueEdit(event.target.value)
                    }}
                />
            </Grid>
        )
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
                marginBottom={'20px'}
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
                        height: '56px',
                        width: isMobile ? '100%' : '70%',
                        backgroundColor: '#c5a400',
                        color: '#FFFF',
                    }}
                    disabled={check ? false : true}
                    onClick={insertService}
                >
                    Adicionar serviço
                </Button>
            </Grid>

            <div className="title">
                <TableRowsIcon sx={{ color: '#03082e', width: '30px', height: '30px' }} />
                Serviços cadastrados
            </div>
            <Grid
                item
                display={'flex'}
                flexDirection={'column'}
                gap="20px"
                justifyContent={'start'}
                alignItems={'start'}
                paddingTop={'10px'}
                style={{ width: '100%' }}
            >
                <Button
                    variant="contained"
                    sx={{
                        width: isMobile ? '100%' : '15%',
                        backgroundColor: isFilter ? '#c0bebe' : '#85170c',
                        color: '#FFFF',
                        '&:hover': {
                            backgroundColor: '#a01b0e',
                        },
                    }}
                    onClick={() => setIsFilter(!isFilter)}
                >
                    Filtrar {isFilter ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </Button>
                {isFilter && (
                    <Grid
                        item
                        display={'flex'}
                        flexDirection={isMobile ? 'column' : 'row'}
                        gap="20px"
                        justifyContent={'start'}
                        alignItems={'end'}
                        style={{ width: '100%' }}
                    >
                        <TextField
                            sx={{ width: isMobile ? '100%' : '20%' }}
                            id="outlined-basic"
                            label={'Filtrar por cliente'}
                            variant="outlined"
                            value={clientNameFilter}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setClientNameFilter(event.target.value.toUpperCase())
                            }}
                        />
                        <TextField
                            sx={{ width: isMobile ? '100%' : '20%' }}
                            id="outlined-basic"
                            label={'Filtrar por barbeiro'}
                            variant="outlined"
                            value={barberFilter}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setBarberFilter(event.target.value.toUpperCase())
                            }}
                        />
                        <Box sx={{ width: isMobile ? '100%' : null }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker disableFuture={true} format="DD/MM/YYYY" onChange={setDate} label="Seleciona o dia" />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>
                        <Button
                            variant="contained"
                            sx={{
                                height: '56px',
                                width: isMobile ? '100%' : '15%',
                                backgroundColor: '#85170c',
                                color: '#FFFF',
                                '&:hover': {
                                    backgroundColor: '#a01b0e',
                                },
                            }}
                            onClick={filterService}
                        >
                            <ManageSearchIcon sx={{ marginRight: '10px' }} /> Buscar
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                height: '56px',
                                width: isMobile ? '100%' : '15%',
                                backgroundColor: '#85170c',
                                color: '#FFFF',
                                '&:hover': {
                                    backgroundColor: '#a01b0e',
                                },
                            }}
                            onClick={clearFilter}
                        >
                            <BackspaceIcon sx={{ marginRight: '10px' }} /> Limpar filtro
                        </Button>
                    </Grid>
                )}
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
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: Data, idx) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                                        {columns.map((column) => {
                                            const value = row[column.id as keyof Data]
                                            return (
                                                <TableCell sx={{ fontSize: 16 }} key={column.id} align={column.align}>
                                                    {column.id === 'action' ? (
                                                        <>
                                                            <EditIcon onClick={() => handleOpenEdit(row)} style={{ cursor: 'pointer' }} />
                                                            <DeleteOutlineOutlinedIcon
                                                                onClick={() => DeleteService(row._id)}
                                                                style={{ cursor: 'pointer' }}
                                                            />
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
                    rowsPerPageOptions={[10, 50, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <div>
                <Modal
                    open={openEdit}
                    onClose={handleCloseEdit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                            Atualizar serviço
                        </Typography>
                        {EditModal()}
                        <Button
                            variant="contained"
                            sx={{
                                width: '100%',
                                marginTop: '20px',
                                backgroundColor: '#c5a400',
                                color: '#FFFF',
                            }}
                            onClick={EditService}
                        >
                            Editar Serviço
                        </Button>
                    </Box>
                </Modal>
            </div>
            <Snackbars message={message} type={checkMessage(message)} open={open} />
        </>
    )
}
