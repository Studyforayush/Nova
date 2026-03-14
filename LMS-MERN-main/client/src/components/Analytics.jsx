import React, { useEffect, useState } from 'react';
import DashboardLayout from './dashboard/DashboardLayout';
import AnalyticsChart from './dashboard/AnalyticsChart';

const Analytics = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Mock data fetch tailored for black and white minimal interface
        const loadData = async () => {
            setChartData({
                bar: {
                    labels: ['Mathematics', 'Science', 'History', 'English'],
                    datasets: [{
                        label: 'Average Scores',
                        data: [75, 82, 65, 88],
                        backgroundColor: '#555555' 
                    }]
                },
                pie: {
                    labels: ['Present', 'Absent', 'Late'],
                    datasets: [{
                        data: [80, 15, 5],
                        backgroundColor: ['#aaaaaa', '#444444', '#777777'],
                        borderWidth: 0,
                    }]
                },
                line: {
                    labels: ['Term 1', 'Term 2', 'Term 3', 'Term 4'],
                    datasets: [{
                        label: 'Overall Performance Trend',
                        data: [68, 72, 75, 81],
                        borderColor: '#ffffff',
                        backgroundColor: 'transparent',
                        tension: 0.4,
                        borderWidth: 2,
                    }]
                }
            });
        };
        loadData();
    }, []);

    if (!chartData) return <DashboardLayout title="Performance Analytics"><div className="text-gray-400">Loading Analytics...</div></DashboardLayout>;

    return (
        <DashboardLayout title="Performance Analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart */}
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-xl shadow-md h-full flex flex-col">
                    <h3 className="text-sm font-medium tracking-wide text-gray-400 uppercase mb-6 text-center">Subject Average Scores</h3>
                    <div className="flex-1 w-full relative min-h-[300px]">
                        <AnalyticsChart type="bar" data={chartData.bar} />
                    </div>
                </div>

                {/* Line Chart */}
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-xl shadow-md h-full flex flex-col">
                    <h3 className="text-sm font-medium tracking-wide text-gray-400 uppercase mb-6 text-center">Performance Trends</h3>
                    <div className="flex-1 w-full relative min-h-[300px]">
                        <AnalyticsChart type="line" data={chartData.line} />
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-xl shadow-md lg:col-span-2 flex flex-col items-center">
                    <h3 className="text-sm font-medium tracking-wide text-gray-400 uppercase mb-6 text-center">Attendance Distribution</h3>
                    <div className="w-full max-w-md relative min-h-[300px]">
                        <AnalyticsChart type="pie" data={chartData.pie} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Analytics;
