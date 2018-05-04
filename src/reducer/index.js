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
  }
}
