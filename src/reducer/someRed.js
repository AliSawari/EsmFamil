var def = {
  users: [],
  myName: undefined
}

export default function someRed(state = def, action){
  switch(action.type){
    case 'ADD':
    return {
      ...state,
      users: [
        ...state.users,
        {
          ...action.user,
          id: state.users.length + 1,
          createdAt: Date.now()
        }
      ]
    }
  }
}
