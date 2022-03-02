
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BublicPage from "../components/public/BublicPage";
import Imagein from "../react-native/Imagein";
import {logo} from "../public/images";
import {TextInput, View} from "../react-native";
import Button from "../components/public/Button";

const theme = createTheme({ direction: "rtl" });

export default function SignUp() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };
    return (
        <BublicPage title={'ثبت نام کاربر'}>
            <ThemeProvider theme={theme} >
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Imagein src={logo} width={100} height={100} />
                        <span style={{marginTop:16,fontWeight: 'bold',fontSize:18}}>
                            ثبت نام
                        </span>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextInput style={{margin:5,}} label="نام و نام خانوادگی"/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextInput style={{margin:5,}} label="شماره موبایل"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextInput style={{margin:5,}} label="نام کاربری"/>
                                </Grid>
                                <Grid item xs={12} >
                                    <TextInput style={{margin:5,}} label="رمز عبور"/>
                                </Grid>

                                {/*<Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>*/}
                            </Grid>
                            <Button style={{borderRadius:4,marginTop:10,alignSelf:'center',margin:5,width:'100%',padding:10}} >
                                ثبت نام
                            </Button>
                            <View style={{margin:16,marginBottom:60,}}>
                                <Link  href="#" variant="body2">
                                    قبلا ثبت نام کرده اید؟ وارد شوید.
                                </Link>
                            </View>

                        </Box>
                    </Box>

                </Container>
            </ThemeProvider>
            <style jsx global>{`
              
                
            `}</style>

        </BublicPage>
    );
}