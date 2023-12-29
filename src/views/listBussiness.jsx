import React, { useState, useEffect } from "react";
import apiCall from "../api/apicall";
import CancelIcon from '@mui/icons-material/Cancel';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ListBussiness = () => {
  const [bussiness, setBussiness] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBussiness();
        setBussiness(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState('desc');

  const handleSort = (column) => {
    if (orderBy === column) {
      setOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setOrder('asc');
      setOrderBy(column);
    }
  };

  const sortedBussiness = bussiness.slice().sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
  
    if (aValue !== undefined && bValue !== undefined) {
      if (order === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    }
    return [];
  })

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#11235A",
      color: theme.palette.common.white,
      cursor: 'pointer',
      fontSize: 16,
      fontFamily: 'Lato',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      fontFamily: 'Lato',
      textAlign: 'left',
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div>
    <h1 style={styles.header}>Ver negocios</h1>
    {bussiness.length > 0 ? (
      <>
        <div style={styles.tableContainer}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="bussinessTable">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Id</StyledTableCell>
                  <StyledTableCell align="left" onClick={() => handleSort('name')}>
                    Nombre
                    {(
                    <span style={styles.orderIcon}>
                      {order === 'asc' ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </span> )}
                    </StyledTableCell>
                  <StyledTableCell align="left">NIT</StyledTableCell>
                  <StyledTableCell align="left">Email</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedBussiness.map((bussiness) => (
                  <StyledTableRow key={bussiness.name}>
                    <StyledTableCell align="right">{bussiness.id}</StyledTableCell>
                    <StyledTableCell align="right">{bussiness.name}</StyledTableCell>
                    <StyledTableCell align="right">{bussiness.nit}</StyledTableCell>
                    <StyledTableCell align="right">{bussiness.mail}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    ) : (
      <div style={styles.centerContainer}>
        <h1 style={styles.centerText}>Aún no hay negocios creados</h1>
        <CancelIcon style={{ fontSize: '200px', color: '#11235A' }} />
      </div>
    )}
  </div>
  );
};

//listo los negocios

const getBussiness = async () => {
  const response = await apiCall("businesses", "GET");
  return response;
};

const styles = {
  header: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: '16px',
    textAlign: 'left',
  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: '16px',
    textAlign: 'center',
  },
  orderIcon:{
    marginLeft: '5px',
    display: 'inline-block',
    verticalAlign: 'middle' 
  }
};


export default ListBussiness;
