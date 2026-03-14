import React from 'react';

const StudentDetails = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Report Card</h1>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-8 border-b pb-4">
                        <div>
                            <h2 className="text-2xl font-bold w-full">Performance Detail</h2>
                            <p className="text-gray-500">Term 1 Assessment</p>
                        </div>
                    </div>
                    
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-4 font-semibold text-gray-600">Subject</th>
                                <th className="p-4 font-semibold text-gray-600">Score</th>
                                <th className="p-4 font-semibold text-gray-600">Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-4">Mathematics</td>
                                <td className="p-4">85</td>
                                <td className="p-4 text-green-600 font-bold">A</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4">Science</td>
                                <td className="p-4">92</td>
                                <td className="p-4 text-green-600 font-bold">A+</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4">History</td>
                                <td className="p-4">78</td>
                                <td className="p-4 text-blue-600 font-bold">B+</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;
