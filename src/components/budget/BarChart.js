import React, {useState} from 'react';
import {Chart} from "react-google-charts";

const BarChart = (props) => {

    const data = props.budget.data ? props.budget.data.rows.reduce((acc, cur) => {
        if (cur.description in acc) {
            acc[cur.description] += Number(cur.amount);
        } else {
            acc[cur.description] = Number(cur.amount);
        }
        return acc;
    }, {}) : {};

    const chartData = [['Category', 'Amount']];
    Object.keys(data).forEach((key) => chartData.push([key, data[key]]));
    return (
        <div>
            <Chart
                width={'100%'}
                height={'400px'}
                chartType='BarChart'
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                    title: 'Expenses by Category',
                    backgroundColor: 'goldenrod',
                    chartArea: { backgroundColor: 'goldenrod' },
                    legend: { textStyle: { color: 'white' } },
                    hAxis: { textStyle: { color: 'white' } },
                    vAxis: { textStyle: { color: 'white' } },
                }}
            />
        </div>
    );
};

export default BarChart;