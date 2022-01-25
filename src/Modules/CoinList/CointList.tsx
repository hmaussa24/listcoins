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
import CoinListComponent from "./Components/CoinListComponet";
import GeneralDataCoinComponent from "./Components/GeneralDataCoinComponent";
import { useNavigate } from "react-router-dom";
import { UrlRoutes } from "../../Shared/UrlRoutes";
import { setIdCoins } from "../../Redux/slice/general/general.slice";

const CoinList = () => {
  //Zona de hooks
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [coinsTemp, setCoinsTemp] = useState<ICoin[]>([]);
  const [asc, setAsc] = useState<boolean>(false);
  const [start, setStart] = useState<number>(0);
  const [limit, setLimit] = useState<number>(100);
  const [price, setPrice] = useState<number>(0);
  //zona de redux
  const dispatcher = useAppDispatch();
  const general = useAppSelector((state) => state.general);
  const history = useNavigate();

  /**
   * Funcion para consultar las criptos, el api retorna hasta maximo 100 coins en una consulta
   */
  const getDataCoins = useCallback(() => {
    dispatcher(showSpinner());
    CoinsDataApi.getCoinsData(start, limit)
      .then((result) => {
        setCoins(
          result.data.data.sort(
            (a, b) => Number(b.price_usd) - Number(a.price_usd)
          )
        );
        setCoinsTemp(
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

  /**
   * Funcion para consultar las coins y ordenarlas acendente o desdendente
   */
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
  /**
   * funcion para controlar el rango de criptos que se consultan, el rango va de 100 en 100
   */
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
      if (start <= 0) {
        setStart(0);
        setLimit(100);
      } else {
        setStart(start - 100);
        setLimit(limit - 100);
      }
    }
    //orderCoins();
  };

  const goToCoin = (id: number) => {
    dispatcher(setIdCoins(id));
    history(UrlRoutes.details);
  };

  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
    filterPrice(Number(event.target.value))
  };

  const filterPrice = (rango: number) => {
    const helper: { [key: number]: ICoin[] } = {
      0: coinsTemp,
      1: coinsTemp.filter((coin) => Number(coin.price_usd) < 50),
      2: coinsTemp.filter(
        (coin) => Number(coin.price_usd) > 51 && Number(coin.price_usd) < 100
      ),
      3: coinsTemp.filter(
        (coin) => Number(coin.price_usd) > 101 && Number(coin.price_usd) < 500
      ),
      4: coinsTemp.filter(
        (coin) => Number(coin.price_usd) > 501 && Number(coin.price_usd) < 1000
      ),
      5: coinsTemp.filter((coin) => Number(coin.price_usd) > 1001),
    };

    setCoins(helper[rango]);
  };

  return (
    <>
      <GeneralDataCoinComponent />
      <CoinListComponent
        Coins={coins}
        ordenarCoins={orderCoins}
        asc={asc}
        paginationNavigator={paginationNavigator}
        goToCoin={goToCoin}
        price={price}
        handleChangeFilter={handleChangeFilter}
      />
    </>
  );
};

export default CoinList;
