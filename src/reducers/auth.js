let defaultState = {
  isLogin: false,
  userLogin: {
    
}
}
const authReducer = (state = defaultState, action) => {
  switch (action.type) {
      case "LOGIN_SUCCESS":
          return {
              isLogin: true,
              userLogin: {
                idUser : action.payload.userData.idUser,
                username: action.payload.userData.username,
                role: action.payload.userData.role,
                password: action.payload.userData.password
            }
          }

          case "UPDATE_STATUS_SUCCESS":
            return {
                isLogin: true,
                userLogin: {
                  idUser : action.payload.userData.idUser,
                  username: action.payload.userData.username,
                  role: action.payload.userData.role,
                  password: action.payload.userData.password
              }
            }
  
      case "LOGOUT_SUCCESS":
          return defaultState
     
      default:
          return state
  }

}

export default authReducer