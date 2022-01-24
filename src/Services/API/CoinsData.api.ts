import { AxiosResponse } from 'axios';
import { ICoin } from '../../Shared/Models/CoinData.model';
import { IMarket } from '../../Shared/Models/Markets.model';
import { CoinsDataEndPoints } from '../EndPoints/CoinsData.endpoint';
import { httpGet } from '../httpService';
export const CoinsDataApi = {
    getCoinsData:  (start: number, limit: number) : Promise<AxiosResponse<{data:ICoin[]}>> => {
        return httpGet<{data: ICoin[]}>(`${CoinsDataEndPoints.getCoins}?start=${start}&limit=${limit}`)
    },
    getCoinData: (id: number) : Promise<AxiosResponse<ICoin[]>> => {
        return httpGet<ICoin[]>(`${CoinsDataEndPoints.getCoin}${id}`)
    },
    getMarketsData: (id: number) : Promise<AxiosResponse<IMarket[]>> => {
        return httpGet<IMarket[]>(`${CoinsDataEndPoints.markets}${id}`)
    }
};
