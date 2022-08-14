// Util function just to genrate some random ID
// Let's assume it's like auto-inceremnt function of a real DB
export const generateRandomID = (min = 1, max = 1000000000): string => {
    return String(Math.random() * (max - min) + min);
}

export const getRelationsArray = (relations: string): string[] | undefined => {
    return relations ? relations.split(',') : undefined;
}