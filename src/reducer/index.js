var def = {
  myName: undefined,
  submitted: [],
  isGame: false,
  inGame: false,
  players: [],
  online: []
}

export default function Reducer(state = def, action){
  switch(action.type){

    // adding to online users
    case 'ADD_ONLINE':
      return {
        ...state,
        online: [
          ...state.online,
          {
            ...action.onlineUser,
            id: state.online.length + 1,
            createdAt: Date.now()
          }
        ]
      }

    // remove user from the online users
    case 'REM_USER':
      let before = state.online;
      let after = before.filter(u => {
        return u.name != action.name
      });
      return {
        ...state,
        online: after
      }

    // registering name
    case 'REG_NAME':
      return {
        ...state,
        myName: action.myName
      }
  }
}
