import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hook/hook";
import {
  closeSpinner,
  showSpinner,
} from "../../Redux/slice/spiner/spiner.slice";
import { CoinsDataApi } from "../../Services/API/CoinsData.api";
import { ICoin } from "../../Shared/Models/CoinData.model";
import CoinListComponent from "../Components/CoinListComponet";
import GeneralDataCoinComponent from "../Components/GeneralDataCoinComponent";

const CoinList = () => {
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [asc, setAsc] = useState<boolean>(false);
  const [start, setStart] = useState<number>(0);
  const [limit, setLimit] = useState<number>(100);
  const dispatcher = useAppDispatch();
  const general = useAppSelector((state) => state.general);
  const getDataCoins = useCallback(() => {
    dispatcher(showSpinner());
    CoinsDataApi.getCoinsData(start, limit)
      .then((result) => {
        setCoins(
          result.data.data.sort(
            (a, b) => Number(b.price_usd) - Number(a.price_usd)
          )
        );
        setAsc(true);
        dispatcher(closeSpinner());
      })
      .catch((error) => {
        dispatcher(closeSpinner());
      });
  }, [dispatcher, start, limit]);
  useEffect(() => {
    getDataCoins();
  }, [getDataCoins]);

  const orderCoins = () => {
    if (asc) {
      dispatcher(showSpinner());
      CoinsDataApi.getCoinsData(start, limit)
        .then((result) => {
          setCoins(
            result.data.data.sort(
              (a, b) => Number(a.price_usd) - Number(b.price_usd)
            )
          );
          setAsc(false);
          dispatcher(closeSpinner());
        })
        .catch((error) => {
          dispatcher(closeSpinner());
        });
    } else {
      getDataCoins();
    }
  };

  const paginationNavigator = (orientation: number) => {
    if (orientation === 1) {
      if (limit >= general.criptomonedas) {
        setLimit(general.criptomonedas);
      } else {
        setStart(start + 100);
        setLimit(limit + 100);
      }
    }
    if (orientation === 0) {
      if(start <= 0){
        setStart(0);
        setLimit(100);
      }else{
        setStart(start - 100);
        setLimit(limit - 100);
      }
    }
    //orderCoins();
  };

  return (
    <>
      <GeneralDataCoinComponent />
      <CoinListComponent
        Coins={coins}
        ordenarCoins={orderCoins}
        asc={asc}
        paginationNavigator={paginationNavigator}
      />
    </>
  );
};

export default CoinList;
