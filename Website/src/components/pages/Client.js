import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';

import AppBar from '@material-ui/core/AppBar';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import Popover from '@material-ui/core/Popover';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Logo from '../logos/QuickTixWhite.png';
import EventButton from '../features/headerEventButton.js';
import AccountButton from '../features/headerAccountButton.js';
import Approved from '../features/clientApproved.js';
import Pending from '../features/clientPending.js';
import History from '../features/clientHistory.js';
import {updateRead} from '../actions/updateRead.js';
import {mapDispatchToProps, mapStateToProps} from '../actions/mapProps.js';

class Client extends Component {
  state = {
    messageWindow: false,
    expandMessages: false,
    newMessage: false,
    toError: false,
    messageError: false,
    from: this.props.users[this.props.auth.email].name,
    to: '',
    message: '',
    read: '',
    thread: 1,
    replyTo: '',
    replyMessage: '',
    replyRead: '',
    replyThread: 1
  };

  unreadMessages = 0;

  handleClick = (event, threads) => {
    this.setState({messageWindow: true, newMessage: false});
    this.unreadMessages = 0;

    threads.map((thread) => {
      return thread.map((message) => {
        const dictRead = {};
        var update = 'No'

        for (const user in message.read) {
          if (user === this.props.users[this.props.auth.email].name && message.read[user] === 'No') {
            dictRead[user] = 'Yes';
            update = 'Yes'
          }

          else {
            dictRead[user] = message.read[user]
          }
        }

        if (update === 'Yes') {
          return updateRead(message.id, dictRead)
        }

        else {
          return message
        }

      })
    })
  };

  handleClose = () => {
    this.setState({messageWindow: false, openMessages: false})
  };

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value, [[event.target.id][0].concat('Error')]: false})
  };

  handleToChange = (event, values) => {
    if (values[0] === 'All') {
      const to = [];
      const read = {}

      for (const user in this.props.users) {
        if (this.props.users[user].name !== this.props.users[this.props.auth.email].name && this.props.users[user].organization === this.props.users[this.props.auth.email].organization) {
          to.push(this.props.users[user].name)
          read[this.props.users[user].name] = 'No'
        }
      }

      this.setState({to: to, read: read, toError: false})
    }

    else {
      const read = {}

      for (const user in values) {
        read[values[user]] = 'No'
      }

      this.setState({to: values, read: read, toError: false})
    }
  };

  handleReplyChange = (event, thread) => {
    this.setState({[event.target.id]: event.target.value});

    const to = thread[0].to.concat(thread[0].from).filter(user => user !== this.props.users[this.props.auth.email].name).sort()
    const read = {}

    for (const user in to) {
      read[to[user]] = 'No'
    }

    this.setState({replyTo: to, replyRead: read, replyThread: thread[0].thread})
  };

  handleExpandMessage = () => {
    this.setState({expandMessages: true})
  };

  handleHideMessage = () => {
    this.setState({expandMessages: false})
  }

  handleNewMessage = () => {
    this.setState({newMessage: true})
  };

  handleHideNewMessage = () => {
    this.setState({newMessage: false})
  };

  handleCreateMessage = (event) => {
    event.preventDefault();

    if (this.state.to === '') {
      this.setState({toError: true})
    }

    if (this.state.message === '') {
      this.setState({messageError: true})
    }

    if (this.state.to && this.state.message) {
      this.props.createMessage(this.state);
      this.setState({newMessage: false, to: '', message: ''})
    }
  };

  handleCreateReply = (event) => {
    event.preventDefault();

    if (this.state.replyTo && this.state.replyMessage) {
      this.props.createReply(this.state);
      this.setState({replyTo: '', replyMessage: ''})
    }
  };

  handleSubmit = (event) => {
    this.props.signOut()
  };

  render() {
    const messages = [];
    const threads = [];
    const threadNumbers = [];

    this.props.messages && Array.from(this.props.messages).map((message) => {
      if (Number(message.thread) >= Number(this.state.thread)) {
        this.setState({thread: Number(message.thread) + 1})
      }

      if (message.from === this.props.users[this.props.auth.email].name || message.to.includes(this.props.users[this.props.auth.email].name)) {
        messages.push(message);

        if (!threadNumbers.includes(message.thread)) {
          return threadNumbers.push(message.thread)
        }

        else {
          return message
        }
      }

      else {
        return message
      }
    });

    var unreadMessages = 0

    messages.map((message) => {
      if (message.to.includes(this.props.users[this.props.auth.email].name)) {
        if (message.read[this.props.users[this.props.auth.email].name] === 'No') {
          return unreadMessages += 1
        }

        else {
          return message
        }
      }

      else {
        return message
      }
    });

    this.unreadMessages = unreadMessages

    threadNumbers.map((threadNumber) => {
      const thread = [];

      messages.map((message) => {
        if (threadNumber === message.thread) {
          return thread.push(message)
        }

        else {
          return message
        }
      });

      return threads.push(thread)
    });

    var userList = [];

    for (const user in this.props.users) {
      if (this.props.users[user].name !== this.props.users[this.props.auth.email].name && this.props.users[user].organization === this.props.users[this.props.auth.email].organization)
        userList.push(this.props.users[user].name)
    };

    userList = ['All'].concat(userList.sort());

    const firstMessage = (thread) => thread[0];
    const hiddenMessages = (thread) => thread.slice(1, thread.length - 2);
    const recentMessages = (thread) => thread.slice(thread.length - 2, thread.length + 1);

    const messageWidth = window.innerWidth * 0.35 - 15;
    const table_width = window.innerWidth * 0.65 - 15;

    const indentThread = (firstMessage) => {
      if (firstMessage) {
        return {
          width: messageWidth - 40,
          marginLeft: 0
        }
      }

      else {
        return {
          width: (messageWidth - 40) * 0.925,
          marginLeft: (messageWidth - 40) * 0.075
        }
      }
    };

    const indentReply = (length) => {
      if (length === 1) {
        return {
        width: (messageWidth - 40) * 0.9515 - 20,
        marginLeft: (messageWidth - 40) * 0.075
        }
      }

      else {
        return {
        width: (messageWidth - 40) * 0.8765 - 20,
        marginLeft: (messageWidth - 40) * 0.075 + (messageWidth - 40) * 0.925 * 0.075
        }
      }
    };

    function Message({message, firstMessage}) {
      const [anchorElRecipient, setAnchorElRecepient] = React.useState(null);

      const handleClickRecepient = (event) => {
        setAnchorElRecepient(event.currentTarget)
      };

      const handleCloseRecipient = () => {
        setAnchorElRecepient(null)
      };


      const timedelta = new Date().getTime() - message.timeSubmitted;

      var elapsedTime = null

      if (timedelta < 1000 * 60) {
        elapsedTime = 'Now'
      }

      else if (timedelta < 1000 * 60 * 60) {
        elapsedTime = Math.floor(timedelta / (1000 * 60)).toString() + 'm ago'
      }

      else if (timedelta < 1000 * 60 * 60 * 24) {
        elapsedTime = Math.floor(timedelta / (1000 * 60 * 60)).toString() + 'h ago'
      }

      else if (timedelta < 1000 * 60 * 60 * 24 * 52) {
        elapsedTime = Math.floor(timedelta / (1000 * 60 * 60 * 24)).toString() + 'd ago'
      }

      else if (timedelta < 1000 * 60 * 60 * 24 * 52 * 365) {
        elapsedTime = Math.floor(timedelta / (1000 * 60 * 60 * 24 * 52)).toString() + 'w ago'
      }

      else {
        elapsedTime = Math.floor(timedelta / (1000 * 60 * 60 * 24 * 52 * 365)).toString() + 'y ago'
      };

      return (
        <Grid item id = {message.id}>
          <Grid container style = {{marginLeft: indentThread(firstMessage).marginLeft, width: indentThread(firstMessage).width}} direction = 'column' m = {5}>
            <Grid item>
              <Grid container direction = 'row' alignItems = 'center' ml = {2.5} mr = {5} mt = {5} mb = {5}>
                <Grid item style = {{width: '7.5%'}}>
                  <Avatar variant = 'square' align = 'left'> {message.from.split(' ')[0][0].concat(message.from.split(' ')[1][0])} </Avatar>
                </Grid>
                <Grid item style = {{width: '60%'}}>
                  {(firstMessage) ? <Typography variant = 'h6' align = 'left'> {message.from} </Typography> : <Typography align = 'left'> {message.from} </Typography>}
                </Grid>
                {(!firstMessage) ? null :
                  <Grid item style = {{width: '0%'}}>
                    <Button aria-describedby = {Boolean(anchorElRecipient) ? 'simple-popover' : undefined} variant = 'outlined' align = 'right' onClick = {handleClickRecepient}> RECIPIENTS </Button>
                    <Popover
                      id = {Boolean(anchorElRecipient) ? 'simple-popover' : undefined}
                      anchorEl = {anchorElRecipient}
                      open = {Boolean(anchorElRecipient)}
                      onClose = {handleCloseRecipient}
                      anchorOrigin = {{vertical: 'center', horizontal: 'center'}}
                      transformOrigin = {{vertical: 'center', horizontal: 'center'}}
                    >
                      <Box style = {{maxHeight: 175}} ml = {3} mr = {3} mt = {1} mb = {1}>
                        <Grid container direction = 'column' alignItems = 'center' spacing = {1}>
                          <Grid item>
                            <Typography style = {{borderBottom: '2px solid'}} variant = 'h6'> Recipients </Typography>
                          </Grid>
                          {message.to.map((recepient) => (
                            <Grid item>
                              <Typography> {recepient} </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Popover>
                  </Grid>
                }
                <Grid item style = {{width: '32.5%'}}>
                  <Typography align = 'right'> {elapsedTime} </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style = {{marginLeft: '10%', width: '90%', maxWidth: '90%', overflow: 'hidden', textOverflow: 'ellipsis'}}>
              <Typography align = 'left'> {message.message} </Typography>
            </Grid>
          </Grid>
        </Grid>
      )
    };

    const approved = [];
    const pending = [];
    const history = [];

    this.props.events && this.props.events.map(event => {
      if (event.authorEmail === this.props.auth.email) {
        history.push(event)

        if (event.action === 'Approved' && event.result === 'Approved') {
          return approved.push(event)
        }

        else if (event.action === 'Pending' && event.result === 'Pending') {
          return pending.push(event)
        }

        else {
          return event
        }
      }

      else {
        return event
      }
    });

    return (
      <div>
        <AppBar position = 'static'>
          <Toolbar style = {{backgroundColor: '#3563FF'}}>
            <Box display = 'flex' flexGrow = {1} m = {2}>
              <div>
                <img src = {Logo} alt = 'logo' style = {{height: 50}} />
              </div>
            </Box>
            <Box>
              <Grid container direction = 'row'>
              <EventButton />
                <div>
                  <IconButton onClick = {(event) => this.handleClick(event, threads)}>
                    <Badge badgeContent = {this.unreadMessages} color = 'secondary'>
                      <MailIcon style = {{color: 'white'}} />
                    </Badge>
                  </IconButton>
                </div>
                <AccountButton />
              </Grid>
            </Box>
          </Toolbar>
        </AppBar>
        {(this.state.messageWindow) ?
          <Grid container direction = 'row'>
            <Grid item style = {{width: table_width, maxWidth: table_width, maxHeight: window.innerHeight, overflow: 'auto'}}>
              <Approved rows = {approved} margin = {false} />
              <Pending rows = {pending} margin = {false} />
              <History rows = {history} margin = {false} />
            </Grid>
            <Grid item>
              <Divider style = {{marginRight: 10}} orientation = 'vertical' />
            </Grid>
            <Grid item style = {{width: messageWidth, maxWidth: messageWidth, maxHeight: window.innerHeight, overflow: 'auto'}}>
              <div>
                <Box style = {{width: indentThread(true).width}} ml = {2.5} mr = {5} mt = {5} mb = {5.31249}>
                  <Grid container direction = 'row' alignItems = 'center'>
                    <Grid item style = {{width: '25%'}} align = 'left'>
                      <Button>
                        <CloseIcon onClick = {this.handleClose}/>
                      </Button>
                    </Grid>
                    <Grid item style = {{width: '50%'}} align = 'center'>
                      <Typography variant = 'h6'> Messages </Typography>
                    </Grid>
                    <Grid item style = {{width: '25%'}} align = 'right'>
                      {(this.props.users[this.props.auth.email].type === 'Master') ?
                        <Button onClick = {this.handleNewMessage}>
                          <Typography style = {{marginRight: 5}}> New Thread </Typography>
                          <SendIcon />
                        </Button>
                      : null}
                    </Grid>
                  </Grid>
                </Box>
                <Divider style = {{margin: 10}}/>
                {(this.props.users[this.props.auth.email].type === 'Client' || !this.state.newMessage) ? null :
                  <Box style = {{width: indentThread(true).width}} ml = {2.5} mr = {5} mt = {5} mb = {0}>
                    <Grid container direction = 'column' spacing = {5}>
                      <Grid item>
                        <Autocomplete
                          multiple
                          options = {userList}
                          onChange = {this.handleToChange}
                          renderInput = {(params) => <TextField {...params} label = 'To...' value = {this.state.to} id = 'to' error = {this.state.toError} />}
                        />
                      </Grid>
                      <Grid item style = {{width: indentThread(true).width + 15}}>
                        <Grid container direction = 'row'>
                          <Grid item style = {{width: '90%', maxWidth: '90%'}}>
                            <TextField multiline fullWidth placeholder = 'Message...' value = {this.state.message} id = 'message' onChange = {this.handleChange} error = {this.state.messageError} />
                          </Grid>
                          <Grid item style = {{marginLeft: '2.5%', width: '7.5%'}}>
                            <Button variant = 'outlined' onClick = {this.handleCreateMessage}> Send </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                }
                {(threads.length !== 0) ? threads.map((thread) => (
                  <Box style = {{width: indentThread(true).width, maxWidth: indentThread(true).width}} ml = {2.5} mt = {5} mb = {5}>
                    <Grid container id = {thread[0].thread} direction = 'column' spacing = {3}>
                      <Message message = {firstMessage(thread.reverse())} firstMessage = {true}/>
                      {(thread.length === 4 && this.state.expandMessages) ? <Message message = {hiddenMessages(thread)[0]} firstMessage = {false} /> : null}
                      {(thread.length > 4 && this.state.expandMessages) ? hiddenMessages(thread).map((message) => {return <Message message = {message} firstMessage = {false} />}) : null}
                      <Grid item style = {{marginLeft: indentThread(false).marginLeft, width: indentThread(false).width}}>
                        {(thread.length > 3 && !this.state.expandMessages) ? <Button variant = 'outlined' onClick = {this.handleExpandMessage}> Show {hiddenMessages(thread).length} More </Button> : null}
                        {(thread.length > 3 && this.state.expandMessages) ? <Button variant = 'outlined' onClick = {this.handleHideMessage}> Hide {hiddenMessages(thread).length} Messages </Button> : null}
                      </Grid>
                      {(thread.length === 2) ? <Message message = {recentMessages(thread)[1]} firstMessage = {false} /> : null}
                      {(thread.length > 2) ? recentMessages(thread).map((message) => {return <Message message = {message} firstMessage = {false} />}) : null}
                      <Grid item style = {{marginLeft: indentReply(thread.length).marginLeft, width: indentReply(thread.length).width}}>
                        <Grid container direction = 'row'>
                          <Grid item style = {{width: '90%', maxWidth: '90%'}}>
                            <TextField multiline fullWidth placeholder = 'Reply...' value = {(thread[0].thread === this.state.replyThread) ? this.state.replyMessage : ''} id = 'replyMessage' onChange = {(event) => this.handleReplyChange(event, thread)} />
                          </Grid>
                          <Grid item style = {{marginLeft: '2.5%', width: '7.5%'}}>
                            <Button variant = 'outlined' onClick = {this.handleCreateReply}> Send </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                )) :
                  <Box style = {{width: messageWidth}} mt = {2}>
                    <Typography align = 'center'> No Messages </Typography>
                  </Box>
                }
              </div>
            </Grid>
          </Grid>
        :
          <div>
            <Approved rows = {approved} margin = {true} />
            <Pending rows = {pending} margin = {true} />
            <History rows = {history} margin = {true} />
          </div>
        }
      </div>
    )
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect([{collection: 'users'}, {collection: 'events', orderBy: ['dateSubmitted', 'desc']}, {collection: 'messages', orderBy: ['timeSubmitted', 'desc']}]))(Client)
