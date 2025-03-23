import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

function History({rows, margin}) {
  const [result, setResult] = React.useState(null)
  const [buttonDetail, setButtonDetail] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event, id, result, detail) => {
    setAnchorEl(event.currentTarget);
    setResult(result);
    setButtonDetail(mapResult(result, detail).detail)
  };

  const handleClose = () => {
    setAnchorEl(null)
  };


  const formatDate = (date) => {
    if (date.getMonth() < 10) {
      return '0' + String(date.getMonth()) + '/' + String(date.getDate()) + '/' + String(date.getFullYear())[2] + String(date.getFullYear())[3] + ' ' + date.toLocaleString().split(', ')[1].split(':')[0] + ':' + date.toLocaleString().split(', ')[1].split(':')[1] + ' ' + date.toLocaleString().split(', ')[1].split(' ')[1]
    }

    else {
      return String(date.getMonth()) + '/' + String(date.getDate()) + '/' + String(date.getFullYear())[2] + String(date.getFullYear())[3] + ' ' + date.toLocaleString().split(', ')[1].split(':')[0] + ':' + date.toLocaleString().split(', ')[1].split(':')[1] + ' ' + date.toLocaleString().split(', ')[1].split(' ')[1]
    }
  };

  const mapResult = (result, detail) => {
    if (result === 'Purchased') {
      return {
        backgroundColor: 'green',
        detail: formatDate(new Date(Number(detail)))
      }
    }

    else if (result === 'Failed') {
      return {
        backgroundColor: '#801313',
        detail: detail
      }
    }

    else if (result === 'Approved') {
      return {
        backgroundColor: 'orange',
        detail: formatDate(new Date(Number(detail)))
      }
    }

    else if (result === 'Declined') {
      return {
        backgroundColor: '#801313',
        detail: detail
      }
    }

    else if (result === 'Canceled') {
      return {
        backgroundColor: '#801313',
        detail: detail
      }
    }

    else if (result === 'Pending') {
      return {
        backgroundColor: 'grey',
        detail: formatDate(new Date(Number(detail)))
      }
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

  return (
    <Box ml = {5} mr = {mr()} mt = {5} mb = {5}>
      <Typography style = {{marginTop: 50, marginBottom: 10}} variant = 'h6' align = 'center'> History </Typography>
        <Table size = 'small'>
          <TableHead>
            <TableRow>
              <TableCell style = {{width: '10%'}} align = 'center'> Event Date </TableCell>
              <TableCell style = {{width: '15%'}} align = 'center'> Event Name </TableCell>
              <TableCell style = {{width: '15%'}} align = 'center'> Venue </TableCell>
              <TableCell style = {{width: '10%'}} align = 'center'> Section </TableCell>
              <TableCell style = {{width: '10%'}} align = 'center'> Row </TableCell>
              <TableCell style = {{width: '10%'}} align = 'center'> Seats </TableCell>
              <TableCell style = {{width: '10%'}} align = 'center'> Quantity </TableCell>
              <TableCell style = {{width: '10%'}} align = 'center'> Total Price </TableCell>
              <TableCell style = {{width: '10%'}} align = 'center'> Result </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow id = {row.id}>
                <TableCell style = {{width: '10%', maxWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis'}} align = 'center'> {row.date} </TableCell>
                <TableCell style = {{width: '15%', maxWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis'}} align = 'center'> {row.event} </TableCell>
                <TableCell style = {{width: '15%', maxWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis'}} align = 'center'> {row.venue} </TableCell>
                <TableCell style = {{width: '10%', maxWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis'}} align = 'center'> {row.section} </TableCell>
                <TableCell style = {{width: '10%', maxWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis'}} align = 'center'> {row.row} </TableCell>
                <TableCell style = {{width: '10%', maxWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis'}} align = 'center'> {row.seats} </TableCell>
                <TableCell style = {{width: '10%', maxWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis'}} align = 'center'> {row.quantity} </TableCell>
                <TableCell style = {{width: '10%', maxWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis'}} align = 'center'> ${row.price} </TableCell>
                <TableCell style = {{width: '10%'}} align = 'center'>
                  <Button style = {{width: '75%', color: 'white', backgroundColor: mapResult(row.result, row.detail).backgroundColor}} variant = 'contained' onClick = {(event) => handleClick(event, row.id, row.result, row.detail)}> {row.result} </Button>
                  <Popover
                    id = {Boolean(anchorEl) ? 'simple-popover' : undefined}
                    open = {Boolean(anchorEl)}
                    anchorEl = {anchorEl}
                    onClose = {handleClose}
                    anchorOrigin = {{vertical: 'center', horizontal: 'center'}}
                    transformOrigin = {{vertical: 'center', horizontal: 'center'}}
                  >
                    <Box ml = {3} mr = {3} mt = {1} mb = {1}>
                      <Grid container direction = 'column' alignItems = 'center' spacing = {1}>
                        <Grid item>
                          <Typography style = {{borderBottom: '2px solid'}} variant = 'h6'> {result} </Typography>
                        </Grid>
                        <Grid item>
                          <Typography> {buttonDetail} </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      {(rows.length === 0) ?
        <Box mt = {2}>
          <Typography align = 'center'> No Historical Tickets </Typography>
        </Box>
      : null}
    </Box>
  )
};

export default History;
