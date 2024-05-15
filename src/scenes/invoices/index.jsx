import { Box,Toolbar,Typography,useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mockDataInvoices } from '../../data/mockData';
import Header from '../../components/Header'

const Invoices = () => {
    const theme = useTheme();
    const  colors = tokens(theme.palette.mode);
    
    {/*FUNCTION -columns- 
        keywords:

            columns-rows-fields.
        
            data-key-value.

        cost: 
            O(n) where n are key 'keys' in 'data'.

        receives:
            the first object of a dataset as 'data' parameter.

        does:
            ->use the keys and values of data and use them to create '
            different 'column' objects where the 'column' name is going to be 
            the 'key' and identy that the 'field' is going to contain the 'key' of 
            every 'row'. 
            
            ->Also applies some styles in case the 'key' is equal to something.

            important![0] (This last point can be done into another function we can use Strategy patter to improve it). 
            

        returns:
            the 'column' object created
        
        to improve:
            the important![0] point.
            We can create a new function to be imported with this columns function.

*/ }
    const columns = (data) => {
        if (data.length === 0) return [];

        return Object.entries(data).map(([key, value]) => {
        const column = {
            field: key,
            headerName: key.toUpperCase(),
        };
        if (key === 'cost') {
            column.renderCell = ({ row }) => {
                const { cost } = row;
                return (
                    <Box
                        width="100%"
                        m="10px auto"
                        p=" 5px 10px"
                        display="flex"
                        justifyContent="center"
                        borderRadius="4px"
                    >
                        <Typography color={()=>{
                            const parsedCost = parseFloat(cost);
                            if (parsedCost >= 80) return colors.redAccent[500];
                            if (parsedCost >= 60) return colors.orangeAccent[500];
                            if (parsedCost >= 40) return colors.yellowAccent[500];
                            if (parsedCost >= 20) return colors.greenAccent[500];
                            return colors.blueAccent[500];
                        }        
}
                            sx={{ ml: "5px" }}>
                            ${cost}
                        </Typography>
                    </Box>
                    );
                }
            }
        else if (typeof value === 'string') {
            column.flex = 1;
            column.cellClassName = 'name-column--cell';
        } 
        
        else if (typeof value === "number") {
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
                title = 'INVOICES' 
                subtitle = 'Invoices Information'/>
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
                    color: colors.grey[100]
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
                '& .MuiCheckbox-root':{
                    color: `${colors.greenAccent[200]} !important`,
                }
            }}
        >
            <DataGrid 
                checkboxSelection
                rows = {mockDataInvoices}
                columns={columns(mockDataInvoices[0])}
                components = {{Toolbar: GridToolbar}}  
                />
        </Box>
        
    </Box>)
}

export default Invoices