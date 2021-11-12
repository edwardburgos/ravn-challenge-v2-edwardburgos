export function modifyCurrentPerson(currentPerson: string) {
    return {
        type: 'MODIFY_CURRENT_PERSON',
        currentPerson
    }
}

export function modifyDataparts(dataparts: 0 | 1 | 2) {
    return {
        type: 'MODIFY_DATAPARTS',
        dataparts
    }
}