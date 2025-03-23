const initState = {};

const messageReducer = (state = initState, action) => {
  switch(action.type){
    case 'Create Message Successful':
      console.log('Create Message Successful')
      return state
    case 'Create Message Error':
      console.log('Create Message Error')
      return state
    default:
      return state
  }
};

export default messageReducer
