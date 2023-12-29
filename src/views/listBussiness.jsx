import React, { useState, useEffect } from "react";
import apiCall from "../api/apicall";
import CancelIcon from '@mui/icons-material/Cancel';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

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
  const [order, setOrder] = useState('asc');

  const handleSort = (column) => {
    if (orderBy === column) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(column);
      setOrder('asc');
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

  return (
    <div>
    <h1 style={styles.header}>Ver negocios</h1>
    {bussiness.length > 0 ? (
      <>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableCell}>ID</th>
                <th style={{ ...styles.tableCell, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  Nombre
                  <SortByAlphaIcon onClick={() => handleSort('name')} />
                </th>
                <th style={styles.tableCell}>NIT</th>
                <th style={styles.tableCell}>Email</th>
              </tr>
            </thead>
            <tbody>
              {sortedBussiness.map((bussiness) => (
                <tr key={bussiness.id}>
                  <td style={styles.tableCell}>{bussiness.id}</td>
                  <td style={styles.tableCell}>{bussiness.name}</td>
                  <td style={styles.tableCell}>{bussiness.nit}</td>
                  <td style={styles.tableCell}>{bussiness.mail}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
  tableContainer: {
    width: '40%',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    tableLayout: 'fixed',
  },
  tableHeader: {
    borderBottom: '1px solid #ccc',
  },
  tableCell: {
    padding: '8px',
    border: '1px solid #ccc',
    textAlign: 'left',
    fontSize: '14px',
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
};


export default ListBussiness;
