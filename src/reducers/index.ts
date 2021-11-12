const initialState = {
  currentPerson: "",
  dataparts: 0 // 0 > five | 1 > five and all | 2 > all
}

export default function reducer(state = initialState, action: { type: string, currentPerson: string, dataparts: 0 | 1 | 2 }) {
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