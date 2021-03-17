let defaultState = {
  isLogin: false,
  userLogin: {
    
}
}
const authReducer = (state = defaultState, action) => {
  console.warn("state:", state);
  console.warn("action:", action);
  switch (action.type) {
      case "LOGIN_SUCCESS":
          return {
              isLogin: true,
              userLogin: {
                idUser : action.payload.userData.idUser,
                namaUser: action.payload.userData.namaUser,
                role: action.payload.userData.role
            }
          }

        case "EDIT_PROFIL_SUCCESS":
          return {
              isLogin: true,
              userLogin: {
                idUser : action.payload.userData.idUser,
                namaUser: action.payload.userData.namaUser,
                role: action.payload.userData.role
            }
          }

      case "LOGOUT_SUCCESS":
          return defaultState
     
      default:
          return state
  }

}

export default authReducer