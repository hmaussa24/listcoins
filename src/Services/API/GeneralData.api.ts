import { AxiosResponse } from 'axios';
import { IGeneralData } from '../../Shared/Models/GeneralData.model';
import { GeneralDataEndPint } from '../EndPoints/GeneralData.endpoint';
import { httpGet } from '../httpService';
export const GeneralDataApi = {
    getGeneralData:  () : Promise<AxiosResponse<IGeneralData[]>> => {
        return httpGet<IGeneralData[]>(GeneralDataEndPint.getGeneralData)
    }
};
