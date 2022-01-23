import { ICoin } from "./CoinData.model";

export interface ICoinList {
    Coins: ICoin[],
    ordenarCoins: () => void;
    asc: boolean;
    paginationNavigator: (orientation: number) => void;
}