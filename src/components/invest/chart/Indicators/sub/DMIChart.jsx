import React, { useEffect } from 'react';
import { LineSeries, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getADChart, getATRChart, getCCIChart, getDXChart, getTRIXChart, getWILLRChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function DMIChart({ datas }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.DX);
  const DXValue = useSelector((state) => state.indicatorValues.values.DX);

  const calculateDX = (data) => {
    const updatedDatas = datas.map(item => {
      const newItem = { ...item };
      delete newItem.dx;
      return newItem;
    });

    const newData = [...updatedDatas];
    
    const f_idx = data.begIndex;
    const l_idx = data.nbElement;
    const dx = data.result.outReal;
    for (let i = 0; i < l_idx; i++) {
      newData[f_idx + i] = {
        ...newData[f_idx + i], // 기존 객체를 복사
        ["dx"]: dx[i], // 새로운 속성 추가
      };
    }
    dispatch(setChartDatas(newData));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "Date": DXValue[0],
      }
      dispatch(getDXChart(data))
        .then((res) =>  calculateDX(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.dx;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive]);

  const pricesDisplayFormat = format(".2f");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <LineSeries yAccessor={d => d.dx} strokeStyle='#680A08' />
    </>
  )
}
