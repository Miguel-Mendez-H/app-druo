import React, { useState, useEffect } from "react";
import apiCall from "../api/apicall";
import CancelIcon from '@mui/icons-material/Cancel';

const ListBussiness = () => {
  //creo la tabla donde se van a listar los negocios
  const [bussiness, setBussiness] = useState([]);

  //llamo a la api para listar los negocios
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

  return (
    <div>
      <h1 style={{ fontFamily: 'Lato', fontWeight: 'bold', fontSize: '16px', textAlign: 'left'}}>Ver negocios</h1>
      {bussiness.length > 0 ? (
        <>
        <div style={{width:"40%"}}>
        <table style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'fixed' }}>
  <thead style={{ borderBottom: '1px solid #ccc' }}>
    <tr>
      <th style={{ width: '14px', padding: '8px', border: '1px solid #ccc', textAlign: 'left', fontSize: '14px'}}>
        ID
      </th>
      <th style={{ width: '30px', padding: '8px', border: '1px solid #ccc', textAlign: 'left', fontSize: '14px' }}>
        Nombre
      </th>
      <th style={{ width: '30px', padding: '8px', border: '1px solid #ccc', textAlign: 'left', fontSize: '14px' }}>
        NIT
      </th>
      <th style={{ width: '30px', padding: '8px', border: '1px solid #ccc', textAlign: 'left', fontSize: '14px' }}>
        Email
      </th>
    </tr>
  </thead>
  <tbody>
    {bussiness.map((bussiness) => (
      <tr key={bussiness.id}>
        <td style={{ padding: '8px', border: '1px solid #ccc', fontSize: '14px', textAlign: 'left'}}>{bussiness.id}</td>
        <td style={{ padding: '8px', border: '1px solid #ccc', fontSize: '14px', textAlign: 'left'}}>{bussiness.name}</td>
        <td style={{ padding: '8px', border: '1px solid #ccc', fontSize: '14px', textAlign: 'left'}}>{bussiness.nit}</td>
        <td style={{ padding: '8px', border: '1px solid #ccc', fontSize: '14px', textAlign: 'left'}}>{bussiness.mail}</td>
      </tr>
    ))}
  </tbody>
</table>
        </div>
        </>
        ):(
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ fontFamily: 'Lato', fontWeight: 'bold', fontSize: '16px', textAlign: 'center' }}>
              Aún no hay negocios creados
            </h1>
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

export default ListBussiness;
