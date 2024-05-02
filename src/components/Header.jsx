import { Box,Typography } from "@mui/material";
import { tokens } from '../theme';
import { useTheme } from '@mui/material/styles';


const Header = (props) => {
    const { title,subtitle } = props
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    return <Box mb="30px">
        <Typography 
            variant = "h2" 
            color = {colors.grey[100]} 
            fontWeight= "Bolt" 
            sx={{mb: "5px"}}>

                {title}

        </Typography>

        <Typography 
            variant = "h5" 
            color = {colors.greenAccent[400]}>

                {subtitle}

        </Typography>
    </Box>

}

export default Header