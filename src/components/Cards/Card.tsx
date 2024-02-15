import { Grid, Typography } from '@mui/material'

type CardProps = {
    type?: string
    value: number
    unit?: string
}

export const Card = ({ type, value, unit }: CardProps) => {
    return (
        <Grid
            container={true}
            display={'flex'}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            xs={12}
            lg={12}
            xl={3.9}
            sx={{ backgroundColor: '#FFF', px: '20px', py: '10px', borderRadius: '10px', boxShadow: '0px 0px 5px 0px #00000058' }}
        >
            <Typography sx={{ fontSize: '18px', fontWeight: 'regular' }}>{type}</Typography>
            <Typography sx={{ fontSize: '22px', fontWeight: 'bold' }}>{unit ? unit + value : value}</Typography>
        </Grid>
    )
}
