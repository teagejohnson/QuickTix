const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'Login Successful':
      console.log('Login Successful')
      return {
        ...state,
        authError: null
      }
    case 'Login Error':
      console.log('Login Error')
      return {
        ...state,
        authError: 'Login Error'
      }
    case 'Logout Successful':
      console.log('Logout Successful')
      return state
    case 'Logout Error':
      console.log('Logout Error')
      return state
    default:
      return state
  }
};

export default authReducer
