import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import AddExpense from "./AddExpense";
import budget from "./Budget";

const Graphics = (props) => {

    const [isPieChart, setIsPieChart] = useState(true);
    const categories = [
        "Other",
        "Food",
        "Housing",
        "Transportation",
        "Utilities",
        "Insurance",
        "Medical",
        "Entertainment",
        "Personal",
        "Savings",
        "Debt"
    ];

    const chartData = [['Category', 'Amount']];

    if (props.budget.data) {
        const dataRows = props.budget.data.rows;
        categories.forEach(category => {
            const amountSum = dataRows.filter(row => row.name === category)
                .map(row => Number(row.amount))
                .reduce((a, b) => a + b, 0);
            chartData.push([category.toLowerCase(), amountSum]);
            chartData.sort((a, b) => b[1] - a[1]);
        });
    }
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
                        formatters={[
                            {   type: 'NumberFormat',
                                column: 1,
                                options: {
                                    prefix: '$',
                                    suffix: ' USD',
                                },
                            },
                        ]
                                }
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