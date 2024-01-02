export default interface ExtensionType {
    code: string;
    extensionName: string;
}

export default interface CardType {
    id: number;
    name: string;
    manaCost: string;
    colorIdentity: string[];
    type: string;
    rarity: string;
    extensionName: string;
    text: string;
    flavor: string;
    power: string;
    toughness: string;
    imageUrl: string;
    isFavorite: boolean;
}