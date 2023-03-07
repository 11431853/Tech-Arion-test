import { Box, Button, Card, Grid, Popover, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import IconLogo from "../Assets/Screenshot_20230213_214522 1.png"
import FacebookIcon from '@mui/icons-material/Facebook';
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import TwitterIcon from '@mui/icons-material/Twitter';
// import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from 'axios';

// https://admin.gifinfinity.com/accounts/api/client/v1/user-otp-login/
// https://admin.gifinfinity.com/products/api/client/v1/products-list/

const Login = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [phoneText, setPhoneText] = useState(null);
    const [otpText, setOtpText] = useState(null);
    const [bearerToken, setBearerToken] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleOpenProducts = (acess) => {

    const fetchData = async(url) =>
                    {
                        return await axios.post(url).then((res) => {
                            console.log("resprducts",res.data)
                            
                        } ).catch((err) => {console.log("productserr",err)});
                    }

   fetchData(`https://admin.gifinfinity.com/products/api/client/v1/products-list/${acess}`);

  }

  const handleLogin = (e) => {
    e.preventDefault();
        // console.log("clickedonlogin", phoneText,otpText);
        let obj = {
            phone: phoneText,
             otp: otpText
                }
            
        

        const fetchData = async(url) =>
                    {
                        return await axios.post(url,obj).then((res) => {
                            console.log("res",res.data)
                            if(res.data.message === "User logged in  successfully") {
                                //access
                                setBearerToken(`Bearer ${res.data.access}`);
                                handleOpenProducts(`Bearer ${res.data.access}`);
                            }
                        } ).catch((err) => {console.log("posterror",e)});
                    }

   fetchData("https://admin.gifinfinity.com/accounts/api/client/v1/user-otp-login/");
  }

  const handlePhoneTextChange = (e) => {
    // console.log("phoneText",e.target.value)
    setPhoneText(e.target.value)
  }

  const handlePasswordText = (e) => {
    // console.log("p")
    setOtpText(e.target.value);
  }


  return (
    <div>
      
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
  Open Popover
</Button>
<Popover
  id={id}
  open={open}
  anchorEl={anchorEl}
//   onClose={handleClose}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
>
<Card  variant="outlined" style={{width: "100%", margin: "auto", padding: "12px"}}>
        <form onSubmit={handleLogin}>
        <img src={IconLogo} alt="" style={{position: "relative",left: "40%"}} />
        <Typography variant="subtitle1" sx={{color: "#1D4109"}}>Welcome to Tech Arion</Typography>
        <Typography variant="body2" sx={{color: "#6E6B7B", width: "70%"}}>Please sign-in to your account and start the adventure</Typography>
        <Box marginTop={4}>
        <Typography variant='body2' sx={{color: "#6E6B7B"}}>Phone number</Typography>
        <TextField id="outlined-basic" sx={{width: "217px", height: "0.5em!important"}}  variant="outlined" value={phoneText} type='number' onChange={handlePhoneTextChange} />
        <Button variant="contained" sx={{width: "110px", height: "38px", background: "#1D4109"}}>Get OTP</Button>
        </Box>
        <Box marginTop={2}>
        <Typography variant='body2' sx={{color: "#6E6B7B"}}>OTP</Typography>
        <TextField id="outlined-basic" type='password' sx={{width: "334px", height: "0.5em!important"}} value={otpText} onChange={handlePasswordText}  variant="outlined" />
        </Box>
        <Box marginTop={4}>
        <Button variant="contained" sx={{width: "334px", height: "38px", background: "#1D4109"}} type='Submit'>Login</Button>
        </Box>
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={2}
        marginTop={2}
        >
        <Grid item>
            <FacebookSharpIcon sx={{background: "#3B5998", color: "#ffff", padding: "6px", borderRadius: "1px"}} />
        </Grid>
        <Grid item>
            <TwitterIcon sx={{background: "#00ACEE", color: "#ffff", padding: "6px", borderRadius: "1px"}} /> 
        </Grid>
        <Grid item>
            <EmailIcon sx={{background: "#DB3236", color: "#ffff", padding: "6px", borderRadius: "1px"}} />
        </Grid>
            <GitHubIcon sx={{background: "#211F1F", color: "#ffff", padding: "6px", borderRadius: "1px"}} />
        </Grid>
        </form>
      </Card>
</Popover>
    </div>
  )
}

export default Login
