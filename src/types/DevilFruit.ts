import { DevilFruitType } from './DevilFruitType';

export interface DevilFruit {
    id: number;
    originalName: string;
    romanizedName: string;
    englishName: string;
    meaning?: string;
    type: DevilFruitType;
    debutChapter: string;
    debutEpisode: string;
    debutArc: string;
    currentHolder?: string;
    pastHolders?: string[];
    description?: string;
    awakeningStatus: boolean;
    awakeningDescription?: string;
    isCanon: boolean;
    imageUrl: string;
}