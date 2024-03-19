import React, { useEffect } from 'react';
import { LineSeries, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getADChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function ADChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.AD);

  const calculateAD = (data) => {
    const updatedDatas = datas.map(item => {
      const newItem = { ...item };
      delete newItem.ad;
      return newItem;
    });

    const newData = [...updatedDatas];
    
    const f_idx = data.begIndex;
    const l_idx = data.nbElement;
    const ad = data.result.outReal;
    for (let i = 0; i < l_idx; i++) {
      newData[f_idx + i] = {
        ...newData[f_idx + i], // 기존 객체를 복사
        ["ad"]: ad[i], // 새로운 속성 추가
      };
    }
    dispatch(setChartDatas(newData));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
      }
      dispatch(getADChart(data))
        .then((res) =>  calculateAD(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.ad;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, isShow]);

  const pricesDisplayFormat = format(".2f");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <LineSeries yAccessor={d => d.ad} strokeStyle='#680A08' />
    </>
  )
}
