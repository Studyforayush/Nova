import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';
import DashboardLayout from './dashboard/DashboardLayout';
import DashboardCard from './dashboard/DashboardCard';

const StudentDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);

    return (
        <DashboardLayout title="Student Portal">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.user_metadata?.name || 'Student'}</h1>
                <p className="text-gray-400">Here's your latest performance overview.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard title="Recent Marks (Average across 4 subjects)" value="85%" />
                <DashboardCard title="Attendance (Present for 45 out of 49 days)" value="92%" />
            </div>
        </DashboardLayout>
    );
};

export default StudentDashboard;
