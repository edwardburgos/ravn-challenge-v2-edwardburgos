const initialState = {
  currentPerson: "",
  dataparts: 'five'
}

export default function reducer(state = initialState, action: { type: string, currentPerson: string, dataparts: 'five' | 'all' }) {
  switch (action.type) {
    case 'MODIFY_CURRENTPERSON':
      return {
        ...state,
        currentPerson: action.currentPerson
      }
    case 'MODIFY_DATAPARTS':
      return {
        ...state,
        dataparts: action.dataparts
      }
    default:
      return { ...state }
  }
}