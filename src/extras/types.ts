export type SimplePerson = {
    id: string,
    name: string,
    species: null | { name: string },
    homeworld: { name: string }
}

export type DataTyping = {
    allPeople: {
        people: [
            SimplePerson
        ]
    }
}

export type DataProps = {
    query: string,
    alter: () => void
}

export type PersonDetailsType = {
    eyeColor: string,
    hairColor: string,
    skinColor: string,
    birthYear: string,
    vehicleConnection: {
        vehicles: [{
            name: string
        }]
    }
}