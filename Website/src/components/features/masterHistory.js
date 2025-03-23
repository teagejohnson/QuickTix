import React from 'react';

import Box from '@material-ui/core/Box';
import {DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarExport, GridToolbarFilterButton} from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';

const colors = makeStyles({
  colors: {
    '& .Purchased': {
      color: 'green',
      fontWeight: 'bold'
    },

    '& .Failed': {
      color: '#801313',
      fontWeight: 'bold'
    },

    '& .Approved': {
      color: 'orange',
      fontWeight: 'bold'
    },

    '& .Declined': {
      color: '#801313',
      fontWeight: 'bold'
    },

    '& .Canceled': {
      color: '#801313',
      fontWeight: 'bold'
    },

    '& .Pending': {
      color: 'grey',
      fontWeight: 'bold'
    }
  }
});

function History({rows, margin}) {
  const classes = colors();

  const formatDate = (date) => {

    if (date.getMonth() < 10) {
      return '0' + String(date.getMonth()) + '/' + String(date.getDate()) + '/' + String(date.getFullYear())[2] + String(date.getFullYear())[3] + ' ' + date.toLocaleString().split(', ')[1].split(':')[0] + ':' + date.toLocaleString().split(', ')[1].split(':')[1] + ' ' + date.toLocaleString().split(', ')[1].split(' ')[1]
    }

    else {
      return String(date.getMonth()) + '/' + String(date.getDate()) + '/' + String(date.getFullYear())[2] + String(date.getFullYear())[3] + ' ' + date.toLocaleString().split(', ')[1].split(':')[0] + ':' + date.toLocaleString().split(', ')[1].split(':')[1] + ' ' + date.toLocaleString().split(', ')[1].split(' ')[1]
    }
  };

  const mr = () => {
    if (margin === true) {
      return 5
    }

    else {
      return 2.5
    }
  };

  const listRows = [];

  rows.map((row) => {
    return listRows.push({
      id: row.id,
      date: row.date,
      event: row.event,
      venue: row.venue,
      section: row.section,
      row: row.row,
      seats: row.seats,
      quantity: row.quantity,
      price: '$'.concat(String(Math.round(Number(row.price) / (Number(row.quantity) + 0.000001)))),
      result: row.result,
      detail: (row.result === 'Failed' || row.result === 'Declined' || row.result === 'Canceled') ? row.detail : formatDate(new Date(Number(row.detail))),
      authorEmail: row.authorEmail,
      dateSubmitted: formatDate(new Date(Number(row.dateSubmitted)))
    })
  });

  function Toolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport csvOptions = {{allColumns: true}} />
      </GridToolbarContainer>
    )
  };

  return (
    <Box ml = {5} mr = {mr()} mt = {5} mb = {5}>
      <Typography style = {{marginTop: 50, marginBottom: 10}} variant = 'h6' align = 'center'> History </Typography>
        {(rows.length > 0) ?
          <Box className = {classes.colors} style = {{width: '100%'}}>
            <DataGrid
              autoHeight = {true}
              checkboxSelection = {true}
              disableSelectionOnClick = {true}
              components = {{
                Toolbar: Toolbar
              }}
              columns = {[
                {field: 'date', headerName: 'Event Date', type: 'date', headerAlign: 'center', align: 'center', flex: 10},
                {field: 'event', headerName: 'Event Name', headerAlign: 'center', align: 'center', flex: 10},
                {field: 'venue', headerName: 'Venue', headerAlign: 'center', align: 'center', flex: 10},
                {field: 'section', headerName: 'Section', headerAlign: 'center', align: 'center', flex: 10},
                {field: 'row', headerName: 'Row', headerAlign: 'center', align: 'center', flex: 10},
                {field: 'seats', headerName: 'Seats', headerAlign: 'center', align: 'center', flex: 10, headerClassName: 'aaa'},
                {field: 'quantity', headerName: 'Quantity', type: 'number', headerAlign: 'center', align: 'center', flex: 10},
                {field: 'price', headerName: 'Ticket Price', type: 'number', headerAlign: 'center', align: 'center', flex: 10},
                {field: 'result', headerName: 'Result', headerAlign: 'center', align: 'center', flex: 10},
                {field: 'detail', headerName: 'Detail', headerAlign: 'center', align: 'center', flex: 10},
                {field: 'authorEmail', headerName: 'Author Email', headerAlign: 'center', align: 'center', flex: 10, hide: true},
                {field: 'dateSubmitted', headerName: 'Date Submitted', type: 'date', headerAlign: 'center', align: 'center', flex: 10, hide: true}
              ]}
            rows = {listRows}
            getCellClassName = {(params) => {
              if (params.field === 'result') {
                return params.row.result
              }

              else {
                return params
              }
            }}
          />
        </Box>
        :
          <Box mt = {2}>
            <Typography align = 'center'> No Historical Tickets </Typography>
          </Box>
        }
    </Box>
  )
};

export default History;
