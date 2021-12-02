import { Box, makeStyles } from '@material-ui/core';
import React from 'react'


const useStyle = makeStyles({
    component:{
        background:'#f8f9fa',
        height:'100%',
        padding:'50px 0',
        textAlign:'center'
    },

    image:{
        width:'450px'
    }
})


const EmptyChat = () => {
    const s = "https://ik.imagekit.io/ag/wp-content/uploads/2015/01/QR-connected.png";
    const classes = useStyle();
    return (
        <Box className={classes.component}>
           <img src={s} alt="" className={classes.image} /> 
        </Box>
    )
}

export default EmptyChat
