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

import {updateResult} from '../actions/updateResult.js';

function Awaiting({rows, margin}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null)
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
      <Typography style = {{marginTop: 50, marginBottom: 10}} variant = 'h6' align = 'center'> Awaiting Purchase </Typography>
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
              <TableCell style = {{width: '10%'}} align = 'center'> Ticket Price </TableCell>
              <TableCell style = {{width: '10%'}} align = 'center'> </TableCell>
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
                <TableCell style = {{width: '10%', maxWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis'}} align = 'center'> ${Math.round(Number(row.price) / (Number(row.quantity) + 0.000001))} </TableCell>
                <TableCell style = {{width: '10%'}} align = 'center'>
                  <Button style = {{width: '75%', color: '#801313', border: '2px solid'}} variant = 'outlined' onClick = {handleClick}> CANCEL </Button>
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
                          <Typography style = {{borderBottom: '2px solid'}} variant = 'h6'> Reason </Typography>
                        </Grid>
                        <Grid item>
                          <Button onClick = {updateResult(row.id, 'Canceled', 'Done With Event')}> Done With Event </Button>
                        </Grid>
                        <Grid item>
                          <Button onClick = {updateResult(row.id, 'Canceled', 'Too Expensive')}> Too Expensive </Button>
                        </Grid>
                        <Grid item>
                          <Button onClick = {updateResult(row.id, 'Canceled', 'Other')}> Other </Button>
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
          <Typography align = 'center'> No Tickets Awaiting Purchase </Typography>
        </Box>
      : null}
    </Box>
  )
};

export default Awaiting;
