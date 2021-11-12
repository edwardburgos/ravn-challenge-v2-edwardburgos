export function modifyCurrentPerson(currentPerson: string) {
    return {
        type: 'MODIFY_CURRENTPERSON',
        currentPerson
    }
}

export function modifyDataparts(dataparts: 'five' | 'all') {
    return {
        type: 'MODIFY_DATAPARTS',
        dataparts
    }
}