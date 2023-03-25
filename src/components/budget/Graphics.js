import React, { useState } from 'react';
import { Chart } from 'react-google-charts';

const Graphics = (props) => {
    const [isPieChart, setIsPieChart] = useState(true);
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

    const toggleChartType = () => {
        setIsPieChart(!isPieChart);
    };

    return (
        <div className='chart'  onClick={toggleChartType}>
            <div className='chart-title'>
                <h5>{isPieChart ? 'click for Bar Chart' : 'click for Pie Chart'}</h5>
            </div>

                {isPieChart ? (
                    <Chart
                        width={'100%'}
                        height={'400px'}
                        chartType='PieChart'
                        loader={<div>Loading Chart</div>}
                        data={chartData}
                        options={{
                            title: 'Expenses by Category',
                            backgroundColor: 'goldenrod',
                            chartArea: { backgroundColor: 'goldenrod' },
                            legend: { textStyle: { color: 'white' } },
                            pieSliceTextStyle: { color: 'white' },
                        }}
                    />
                ) : (
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
                )}
            </div>

    );
};

export default Graphics;