import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, {FC} from "react";

export interface Details  {
    cardsCount:number
    cardsPrice: number
}

interface IDetails {
    details: Details
    setDetails: (val: Details) => void
}


export const InvoiceDetails: FC<IDetails> = ({details, setDetails}) => {

    const cardsCountHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDetails({...details, cardsCount: +event.target.value})
    }

    const cardsPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDetails({...details, cardsPrice: +event.target.value})
    }

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Пожалуйста, заполните форму
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id='cardsCount'
                        type='number'
                        label="Количество карточек"
                        fullWidth
                        variant="standard"
                        value={details.cardsCount}
                        onChange={cardsCountHandler}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardsPrice"
                        type='number'
                        label="Стоимость одной карточки"
                        fullWidth
                        variant="standard"
                        value={details.cardsPrice}
                        onChange={cardsPrice}
                    />
                </Grid>
                {/*<Grid item xs={12} md={6}>*/}
                {/*    <TextField*/}
                {/*        required*/}
                {/*        id="expDate"*/}
                {/*        label="Expiry date"*/}
                {/*        fullWidth*/}
                {/*        autoComplete="cc-exp"*/}
                {/*        variant="standard"*/}
                {/*    />*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12} md={6}>*/}
                {/*    <TextField*/}
                {/*        required*/}
                {/*        id="cvv"*/}
                {/*        label="CVV"*/}
                {/*        helperText="Last three digits on signature strip"*/}
                {/*        fullWidth*/}
                {/*        autoComplete="cc-csc"*/}
                {/*        variant="standard"*/}
                {/*    />*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12}>*/}
                {/*    <FormControlLabel*/}
                {/*        control={<Checkbox color="secondary" name="saveCard" value="yes" />}*/}
                {/*        label="Remember credit card details for next time"*/}
                {/*    />*/}
                {/*</Grid>*/}
            </Grid>
        </>
    );
}