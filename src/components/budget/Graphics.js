import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import AddExpense from "./AddExpense";

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
                <h5 style={{color:"purple"}}>{isPieChart ? 'click for Bar Chart' : 'click for Pie Chart'}</h5>
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
                            titleColor: 'purple',
                            backgroundColor: 'goldenrod',
                            chartArea: { backgroundColor: 'goldenrod' },
                            legend: { textStyle: { color: 'purple' } },
                            hAxis: { textStyle: { color: 'white' } },
                            vAxis: { textStyle: { color: 'white' } },
                            is3D: true
                        }
                        }

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
                            titleColor: 'purple',
                            backgroundColor: 'goldenrod',
                            chartArea: { backgroundColor: 'goldenrod' },
                            legend: { textStyle: { color: 'purple' } },
                            hAxis: { textStyle: { color: 'purple' } },
                            vAxis: { textStyle: { color: 'purple' } },
                            colors: ['purple'],
                        }}
                    />
                )}
            <div >

            </div>
            <div>

            </div>
            </div>

    );
};

export default Graphics;