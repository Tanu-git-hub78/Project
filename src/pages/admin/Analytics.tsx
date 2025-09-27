import React from 'react';
import Layout from '../../components/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Download, FileText, TrendingUp } from 'lucide-react';
import { getAnalyticsData } from "../src/data/mockData";

const Analytics: React.FC = () => {
  const analyticsData = getAnalyticsData();

  
  const chartData = analyticsData.map(data => ({
    name: data.degree,
    submitted: data.submitted,
    pending: data.pending,
    total: data.total,
    percentage: data.percentage
  }));

  const statusData = [
    { 
      name: 'Submitted', 
      value: analyticsData.reduce((sum, data) => sum + data.submitted, 0), 
      color: '#10B981' 
    },
    { 
      name: 'Pending', 
      value: analyticsData.reduce((sum, data) => sum + data.pending, 0), 
      color: '#F59E0B' 
    }
  ];

  const topPerformingDegrees = [...analyticsData]
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);

  const exportReport = (format: string) => {
    alert(`Exporting analytics report in ${format.toUpperCase()} format...`);
  };

  const totalStudents = analyticsData.reduce((sum, data) => sum + data.total, 0);
  const totalSubmitted = analyticsData.reduce((sum, data) => sum + data.submitted, 0);
  const totalPending = analyticsData.reduce((sum, data) => sum + data.pending, 0);
  const overallSubmissionRate = totalStudents > 0 ? Math.round((totalSubmitted / totalStudents) * 100) : 0;

  return (
    <Layout title="Analytics Dashboard">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
          <p className="text-gray-600">Comprehensive project submission statistics and performance metrics.</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => exportReport('pdf')}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => exportReport('excel')}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <FileText className="h-4 w-4" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Across all degrees</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Projects Submitted</p>
              <p className="text-3xl font-bold text-green-600">{totalSubmitted}</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Successfully submitted</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Submissions</p>
              <p className="text-3xl font-bold text-orange-600">{totalPending}</p>
            </div>
            <div className="h-8 w-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Awaiting submission</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Submission Rate</p>
              <p className="text-3xl font-bold text-purple-600">{overallSubmissionRate}%</p>
            </div>
            <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Overall performance</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Submissions per Degree</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="submitted" fill="#10B981" name="Submitted" />
              <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Overall Submission Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {statusData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span>{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Degrees */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Degrees</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {topPerformingDegrees.map((degree, index) => (
            <div key={degree.degree} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">{degree.percentage}%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">{degree.degree}</div>
              <div className="text-xs text-gray-500">{degree.submitted}/{degree.total} submitted</div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Degree Performance */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Detailed Degree Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Degree</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Total Students</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Submitted</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Pending</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Submission Rate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Progress</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.map((data, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900">{data.degree}</td>
                  <td className="py-4 px-4 text-gray-600">{data.total}</td>
                  <td className="py-4 px-4 text-green-600 font-medium">{data.submitted}</td>
                  <td className="py-4 px-4 text-orange-600 font-medium">{data.pending}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      data.percentage >= 80 ? 'bg-green-100 text-green-800' :
                      data.percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      data.percentage >= 40 ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {data.percentage}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          data.percentage >= 80 ? 'bg-green-600' :
                          data.percentage >= 60 ? 'bg-yellow-600' :
                          data.percentage >= 40 ? 'bg-orange-600' :
                          'bg-red-600'
                        }`}
                        style={{ width: `${data.percentage}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;