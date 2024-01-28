import * as React from 'react'
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'
import { formatarData } from '../../utils/formatterData'
import { convertDate } from '../../utils/convertDate'
import Snackbars from '../../components/SnackBar'
import { User } from '../../model/User'
import { useMedia } from '../../hooks/mediaQueryHook'

export default function UpdateUser() {
    const isMobile = useMedia('(max-width: 850px)')
    const [listUser, setListUser] = React.useState<User[]>()
    const [search, setSearch] = React.useState<string>()
    const [user, setUser] = React.useState<User>()
    const [newNameUser, setNewNameUser] = React.useState<string | undefined>()
    const [newEmailUser, setNewEmailUser] = React.useState<string | undefined>()
    const [newCPFLUser, setNewCPFUser] = React.useState<string | undefined>()
    const [newDNUser, setNewDNUser] = React.useState<string | undefined>()
    const [newRoleUser, setNewRoleUser] = React.useState<string | undefined>()
    const [newPhoneUser, setNewPhoneUser] = React.useState<string | undefined>()
    const [newCreatedAtUser, setNewCreatedAtUser] = React.useState<string | undefined>()
    const [message, setMessage] = React.useState<string>('')
    const [open, setOpen] = React.useState(false)

    const searchUser = () => {
        axios
            .get(`${import.meta.env.VITE_API_URI}/users/${search}`)
            .then((res) => setDataUser(res.data[0]))
            .catch((err) => console.log(err))
    }

    const setDataUser = (user: User) => {
        setUser(user)
        setNewEmailUser(user.email)
        setNewNameUser(user.name)
        setNewCPFUser(user.cpf)
        setNewDNUser(user.dn)
        setNewRoleUser(String(user.role))
        setNewPhoneUser(user.telephone)
        setNewCreatedAtUser(formatarData(user.createdAt))
    }

    React.useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URI}/users/`).then((res) => {
            setListUser(res.data)
        })
    }, [open])

    const handleChange = (event: SelectChangeEvent) => {
        setSearch(event.target.value)
    }

    const handleChangeRole = (event: SelectChangeEvent) => {
        setNewRoleUser(event.target.value)
    }

    const updateUser = () => {
        if (user) {
            axios
                .put(`${import.meta.env.VITE_API_URI}/users/${user.cpf}`, {
                    name: newNameUser ? newNameUser : user.name,
                    email: newEmailUser ? newEmailUser : user.email,
                    cpf: newCPFLUser ? newCPFLUser : user.cpf,
                    dn: newDNUser ? newDNUser : user.dn,
                    role: newRoleUser ? newRoleUser : user.role,
                    telephone: newPhoneUser ? newPhoneUser : user.telephone,
                    createdAt: newCreatedAtUser ? convertDate(newCreatedAtUser) : convertDate(user.createdAt),
                })
                .then((res) => {
                    setMessage(res.data)
                    setOpen(true)
                    setTimeout(() => {
                        setUser(undefined)
                        setOpen(false)
                    }, 2000)
                })
                .catch((err) => console.log(err))
        }
    }

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
                        <InputLabel id="demo-simple-select-label">Selecione o usuario</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={newNameUser}
                            label="Selecione o usuario"
                            onChange={handleChange}
                        >
                            {listUser?.map((user: User) => (
                                <MenuItem value={user.cpf}>{`${user.name} - ${user.cpf}`}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        sx={{
                            width: isMobile ? '100%' : '55px',
                            height: '55px',
                            backgroundColor: '#5e6464',
                            color: '#FFFF',
                        }}
                        onClick={searchUser}
                    >
                        <SearchIcon />
                    </Button>
                </Box>
            </Grid>
            {user && (
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
                            id="outlined-basic"
                            label="Nome do usuario"
                            variant="outlined"
                            value={newNameUser}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setNewNameUser(event.target.value)
                            }}
                        />
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Email do usuario"
                            variant="outlined"
                            value={newEmailUser}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setNewEmailUser(event.target.value)
                            }}
                        />
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="CPF"
                            variant="outlined"
                            value={newCPFLUser}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setNewCPFUser(event.target.value)
                            }}
                        />
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Data de nascimento"
                            variant="outlined"
                            value={newDNUser}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setNewCreatedAtUser(event.target.value)
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
                            id="outlined-basic"
                            label="Telefone"
                            variant="outlined"
                            value={newPhoneUser}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setNewPhoneUser(event.target.value)
                            }}
                        />
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Data de criação"
                            variant="outlined"
                            value={newCreatedAtUser}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setNewCreatedAtUser(event.target.value)
                            }}
                        />

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Permissão</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={newRoleUser}
                                label="Permissão"
                                onChange={handleChangeRole}
                            >
                                <MenuItem value={1}>{`Administração`}</MenuItem>
                                <MenuItem value={2}>{`Funcionario`}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Snackbars
                        message={message}
                        type={message !== 'Usuário atualizado com sucesso!' ? 'error' : 'success'}
                        open={open}
                    />
                    <Grid item display={'flex'} justifyContent={isMobile ? 'center' : 'end'} width={'100%'}>
                        <Button
                            variant="contained"
                            onClick={updateUser}
                            sx={{
                                width: '200px',
                                backgroundColor: '#5e6464',
                                color: '#FFFF',
                            }}
                        >
                            Atualizar dados do usuarios
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Grid>
    )
}
