import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';
import DashboardLayout from './dashboard/DashboardLayout';
import AnalyticsChart from './dashboard/AnalyticsChart';
import DataTable from './dashboard/DataTable';

const FacultyDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);

    const chartData = {
        labels: ['Class 10A', 'Class 10B', 'Class 11A'],
        datasets: [{
            label: 'Class Average Performance',
            data: [78, 65, 82],
            backgroundColor: '#aaaaaa' // strictly grayscale
        }]
    };

    const studentsNeedingAttention = [
        { name: 'John Doe', class: '10B', score: '45%' },
        { name: 'Jane Smith', class: '10A', score: '48%' },
    ];

    const columns = [
        { header: 'Student Name', accessor: 'name' },
        { header: 'Class', accessor: 'class' },
        { header: 'Score', accessor: 'score' },
    ];

    return (
        <DashboardLayout title="Faculty Portal">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#2a2a2a] shadow-md flex flex-col h-full">
                    <h3 className="text-sm font-medium tracking-wide text-gray-400 uppercase mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        Class Performance
                    </h3>
                    <div className="flex-1 min-h-[250px] relative">
                        <AnalyticsChart type="bar" data={chartData} />
                    </div>
                </div>

                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#2a2a2a] shadow-md flex flex-col h-full">
                    <h3 className="text-sm font-medium tracking-wide text-gray-400 uppercase mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        Needs Attention
                    </h3>
                    <div className="flex-1">
                        <DataTable columns={columns} data={studentsNeedingAttention} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FacultyDashboard;
