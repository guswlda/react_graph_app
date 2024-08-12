import React, { useEffect } from 'react';
import HeadTitle from './HeadTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalesMapData } from '../../redux/slices/apiSlice';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import geoUrl from '../../constants/world-50m.v1.json';
import { COLOR_MAP } from '../../constants/menuLists';

// react안에 랜더링 되므로 밖에 따로 변수 생성
const getFillColor = (fillCode) => COLOR_MAP[fillCode] || '#ececec';

// useCallback, useRef 등 사용하는 이유 (성능 -> 랜더링 되면 계속 메모리에 자리가 변경됨)
const SalesMap = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.api.salesmapData);

  useEffect(() => {
    dispatch(fetchSalesMapData());
  }, [dispatch]);

  // console.log(state);

  const findCountryId = (countryId) => {
    const matchedCountry = state?.find(
      (country) => country.country_id === countryId
    ); // Geography 컴포넌트는 map으로부터 가져오므로 객체 타입이다.
    // filter는 배열을 반환하므로 사용할 수 없음 => find 사용할 것
    return matchedCountry ? getFillColor(matchedCountry.fill_color) : '#ECECEC';
  };

  // console.log(getFillColor('violet'));

  return (
    <div className="w-[30%] px-[5px] py-[10px]">
      <div className="block-cell">
        <div className="header-wrapper">
          <HeadTitle title="Sales Mapping By Country" />
        </div>
        <div className="map-chart">
          <ComposableMap
            projection="geoNaturalEarth1"
            projectionConfig={{
              rotate: [0, 0, 0],
              scale: 200,
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={findCountryId(geo.id)}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
};

export default SalesMap;
