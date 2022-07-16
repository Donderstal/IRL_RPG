let unlockedDoors: string[] = [];

export const inUnlockedDoorsRegistry = ( doorId: string ): boolean => {
    return unlockedDoors.includes( doorId )
}

export const addDoorToUnlockedDoorsRegistry = ( doorId: string ): void => {
    unlockedDoors.push(doorId)
}

export const getUnlockedDoorsRegistry = (): string[] => {
    return unlockedDoors
}

export const setUnlockedDoorsRegistry = ( doorList: string[] ): void => {
    unlockedDoors = doorList
}
