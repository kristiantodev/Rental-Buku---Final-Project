let defaultState = {
    users: [{
        idUser : "11111",
        username : "admin",
        password : "admin",
        namaUser : "Andika Sanjaya",
        alamat : "Cirebon",
        phone : "081000111222",
        email : "admin@nexsoft.co.id",
        tglRegistrasi : "2020-11-10",
        role : "Admin"
    },
    {
        idUser : "2",
        username : "pl",
        password : "pl",
        namaUser : "Kristianto",
        alamat : "Cirebon",
        phone : "081000111222",
        email : "admin@nexsoft.co.id",
        tglRegistrasi : "2020-11-10",
        role : "Umum"
    }]
}

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
            case "CLEAR_DATA":
                return defaultState
            default:
                return state
    }
}

export default userReducer