import { Box,Typography,useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mockDataTeam } from '../../data/mockData';
import AdminPanelSettingsOutlinedIcon from  '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Header from '../../components/Header'

  

const Team = () => {
    const theme = useTheme();
    const  colors = tokens(theme.palette.mode);
    const columns = (data) => {
        if (data.length === 0) return [];

        return Object.entries(data).map(([key, value]) => {
        const column = {
            field: key,
            headerName: key.toUpperCase(),
        };
        if (key === 'access') {
            column.renderCell = ({ row }) => {
                const { access } = row;
                return (
                    <Box
                        width="110%"
                        m="10px auto"
                        p=" 5px 10px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={access === "admin" ? colors.greenAccent[600] :
                                        access === "manager" ? colors.greenAccent[700] :
                                        colors.greenAccent[800]}
                        borderRadius="4px"
                    >
                        {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
                        {access === "manager" && <SecurityOutlinedIcon />}
                        {access === "user" && <LockOpenOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {access}
                        </Typography>
                    </Box>
                    );
                }
            }
        else if (typeof value === 'string') {
            column.flex = 1;
            column.cellClassName = 'name-column--cell';
        } else if (typeof value === "number") {
            column.type = 'number';
            column.headerAlign = 'left';
            column.align = 'left';
        }
        console.log(columns)
        return column;
        });
    }

    return (<Box m='20px'>
        <Box 
            display='flex' 
            justifyContent='space-between' 
            alignItems='center'>
            
            <Header 
                title = 'TEAM' 
                subtitle = 'Manage Your Team'/>
        </Box>
        <Box 
            m = '40px 0 0 0'
            height='75vh'
            sx={{
                '& .MuiDataGrid-root':{
                    border: 'none'
                },
                '& .MuiDataGrid-cell':{
                    borderBottom: 'none'
                },
                '& .name-column--cell':{
                    color: colors.greenAccent[300]
                },
                '& .MuiDataGrid-columnHeader':{
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: 'none'
                },
                '& .MuiDataGrid-virtualScroller':{
                    backgroundColor: colors.primary[400]
                },
                '& .MuiDataGrid-footerContainer':{
                    borderTop: 'none',
                    backgroundColor: colors.blueAccent[700]
                }
            }}
        >
            <DataGrid 
                rows = {mockDataTeam}
                columns={columns(mockDataTeam[0])}   
                />
        </Box>
        
    </Box>)
}

export default Team