import React from 'react';
import Layout from '../../components/Layout';
import { Users, Eye, Clock, Mail, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAssignedStudents } from '../../data/mockData';
import { Link } from 'react-router-dom';

const AssignedStudents: React.FC = () => {
  const { user } = useAuth();
  const assignedStudents = getAssignedStudents(user?.id || '');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Viva':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title="Assigned Students">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Assigned Students</h2>
        <p className="text-gray-600">Students assigned for viva evaluation and project assessment.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-blue-600">{assignedStudents.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Assigned for evaluation</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Viva</p>
              <p className="text-3xl font-bold text-yellow-600">
                {assignedStudents.filter(s => s.status === 'Pending Viva').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Awaiting evaluation</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Department</p>
              <p className="text-lg font-bold text-green-600">Computer Science</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">B.Sc. Program</p>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Student List</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.rollNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.assignedProject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <Link
                      to="/examiner/evaluation"
                      className="text-green-600 hover:text-green-900 flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Evaluate
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {assignedStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students assigned</h3>
            <p className="text-gray-600">You don't have any students assigned for evaluation yet.</p>
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Need Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Evaluation Guidelines:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Review project documentation thoroughly</li>
              <li>• Assess technical understanding during viva</li>
              <li>• Provide constructive feedback</li>
              <li>• Submit marks within 48 hours</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Contact Support:</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>examiner.support@university.edu</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 mr-2">📞</span>
                <span>+91-XXXX-XXXXXX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AssignedStudents;