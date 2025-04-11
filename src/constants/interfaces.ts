export interface PocketbaseData {
    id: string;
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;
}


export interface StreamerData extends PocketbaseData {
    username: string;
    email: string;
    twitchId: string;
    apiKey: string;
    character: any;
}

export interface GW2Character {
    
}