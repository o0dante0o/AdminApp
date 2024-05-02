import { Box,Toolbar,Typography,useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mockDataContacts } from '../../data/mockData';
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
        if (typeof value === 'string') {
            column.flex = 1;
            column.cellClassName = 'name-column--cell';
        } else if (typeof value === "number") {
            column.type = 'number';
            column.headerAlign = 'left';
            column.align = 'left';
        }
        return column;
        });
    }

    return (<Box m='20px'>
        <Box 
            display='flex' 
            justifyContent='space-between' 
            alignItems='center'>
            
            <Header 
                title = 'CONTACTS' 
                subtitle = 'Contacts Information'/>
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
                },
                '& .MuiDataGrid-menu .MuiButton-text':{
                    color: `${colors.grey[100]} !important`
                }
            }}
        >
            <DataGrid 
                rows = {mockDataContacts}
                columns={columns(mockDataContacts[0])}
                components = {{Toolbar: GridToolbar}}  
                />
        </Box>
        
    </Box>)
}

export default Team