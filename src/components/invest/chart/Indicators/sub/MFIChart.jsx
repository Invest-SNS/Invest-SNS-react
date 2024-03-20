import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getMFIChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function MFIChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.MFI);
  const MFIValue = useSelector((state) => state.indicatorValues.values.MFI);

  const calculateMFI = (data) => {
    const updatedDatas = datas.map(item => {
      const newItem = { ...item };
      delete newItem.mfi;
      return newItem;
    });

    const newData = [...updatedDatas];
    
    const f_idx = data.begIndex;
    const l_idx = data.nbElement;
    const mfi = data.result.outReal;
    for (let i = 0; i < l_idx; i++) {
      newData[f_idx + i] = {
        ...newData[f_idx + i], // 기존 객체를 복사
        ["mfi"]: mfi[i], // 새로운 속성 추가
      };
    }
    dispatch(setChartDatas(newData));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "Date": MFIValue[0],
      }
      dispatch(getMFIChart(data))
        .then((res) =>  calculateMFI(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.mfi;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, MFIValue, isShow]);

  const pricesDisplayFormat = format(",");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <StraightLine yValue={0} lineDash={"ShortDash2"} strokeStyle='#aeafb0' />
      <LineSeries yAccessor={d => d.mfi} strokeStyle='#b05109' strokeWidth={1.3} />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.mfi}
        yLabel="MFI"
        yDisplayFormat={format(",")}
        labelFill='#b05109'
      />
    </>
  )
}
