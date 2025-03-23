const initState = {};

const replyReducer = (state = initState, action) => {
  switch(action.type){
    case 'Create Reply Successful':
      console.log('Create Message Successful')
      return state
    case 'Create Reply Error':
      console.log('Create Message Error')
      return state
    default:
      return state
  }
};

export default replyReducer
