import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import {updateAction} from '../actions/updateAction.js';

function Available({rows, margin}) {
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
      <Typography style = {{marginTop: 0, marginBottom: 10}} variant = 'h6' align = 'center'> Available Tickets </Typography>
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
              <TableCell style = {{width: '10%'}} align = 'center'> Buy </TableCell>
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
                <TableCell style = {{width: '10%', maxWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis'}} align = 'center'> ${Math.round(Number(row.price) / (Number(row.quantity) + 0.000001))}  </TableCell>
                <TableCell style = {{width: '10%'}} align = 'center'>
                  <ButtonGroup fullWidth>
                    <Button style = {{marginLeft: '12.5%', width: '37.5%', color: 'white', backgroundColor: 'green'}} variant = 'contained' onClick = {updateAction(row.id, 'Approved', new Date().getTime())}>
                      <CheckIcon />
                    </Button>
                    <Button style = {{marginRight: '12.5%', width: '37.5%', color: 'white', backgroundColor: '#801313'}} variant = 'contained' onClick = {handleClick}>
                      <ClearIcon />
                    </Button>
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
                            <Button onClick = {updateAction(row.id, 'Declined', 'Go For Next Face Down / Find Price Break')}> Go For Next Face Down / Find Price Break </Button>
                          </Grid>
                          <Grid item>
                            <Button onClick = {updateAction(row.id, 'Declined', 'Try For Good Lowers Near Stage')}> Try For Good Lowers Near Stage </Button>
                          </Grid>
                          <Grid item>
                            <Button onClick = {updateAction(row.id, 'Declined', 'Too Expensive, Try Cheaper Face')}> Too Expensive, Try Cheaper Face </Button>
                          </Grid>
                          <Grid item>
                            <Button onClick = {updateAction(row.id, 'Declined', 'Try For Cheaper Lowers Further Sections, Good Rows')}> Try For Cheaper Lowers Further Sections, Good Rows </Button>
                          </Grid>
                          <Grid item>
                            <Button onClick = {updateAction(row.id, 'Declined', 'Try For 1st Row Next Level Up')}> Try For 1st Row Next Level Up </Button>
                          </Grid>
                          <Grid item>
                            <Button onClick = {updateAction(row.id, 'Declined', 'Try For 2 or 4')}> Try For 2 or 4 </Button>
                          </Grid>
                          <Grid item>
                            <Button onClick = {updateAction(row.id, 'Declined', 'Try For Best Of The Cheapest Face')}> Try For Best Of The Cheapest Face </Button>
                          </Grid>
                          <Grid item>
                            <Button onClick = {updateAction(row.id, 'Declined', 'No Obstructed / Side / Ltd View')}> No Obstructed / Side / Ltd View </Button>
                          </Grid>
                          <Grid item>
                            <Button onClick = {updateAction(row.id, 'Declined', 'No Odds')}> No Odds </Button>
                          </Grid>
                          <Grid item>
                            <Button onClick = {updateAction(row.id, 'Declined', 'Outside Paramaters')}> Outside Paramaters </Button>
                          </Grid>
                          <Grid item>
                            <Button onClick = {updateAction(row.id, 'Declined', 'Done With This Event')}> Done With This Event </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Popover>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      {(rows.length === 0) ?
        <Box mt = {2}>
          <Typography align = 'center'> No Tickets Available </Typography>
        </Box>
      : null}
    </Box>
  )
};

export default Available
