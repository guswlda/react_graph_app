import React, { useEffect } from 'react';
import HeadTitle from './HeadTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVolumeServiceData } from '../../redux/slices/apiSlice';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const VolumeService = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.api.volumeserviceData);

  useEffect(() => {
    dispatch(fetchVolumeServiceData());
  }, [dispatch]);

  console.log(state);
  return (
    <div className="w-[30%] px-[5px] py-[10px]">
      <div className="block-cell">
        <div className="header-wrapper">
          <HeadTitle title="Volume VS Services Level" />
        </div>
        <div className="volume-chart w-full h-[280px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={state}
              margin={{
                top: 10,
                right: 20,
                left: -10,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 0"
                horizontal={true}
                vertical={false}
              />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Legend />
              <Bar
                dataKey="volume"
                stackId="a"
                fill="#0095ff"
                barSize={18}
                strokeWidth={2}
              />
              <Bar
                dataKey="services"
                stackId="a"
                fill="#82ca9d"
                barSize={18}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default VolumeService;
