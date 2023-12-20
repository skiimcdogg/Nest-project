export default interface ExtensionType {
    code: string;
    setName: string;
}

export default interface CardType {
    id: number;
    name: string;
    manaCost: string;
    colorIdentity: string[];
    type: string;
    rarity: string;
    setName: string;
    text: string;
    flavor: string;
    power: string;
    toughness: string;
    imageUrl: string;
    isFavorite: boolean;
}