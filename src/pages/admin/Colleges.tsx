import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Plus, Edit, Trash2, Users, Building } from 'lucide-react';
import { colleges } from '../../data/mockData';

const Colleges: React.FC = () => {
  const [collegeList, setCollegeList] = useState(colleges);
  const [showModal, setShowModal] = useState(false);
  const [editingCollege, setEditingCollege] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    students: 0,
    established: ''
  });

  const handleAdd = () => {
    setEditingCollege(null);
    setFormData({ name: '', location: '', students: 0, established: '' });
    setShowModal(true);
  };

  const handleEdit = (college: any) => {
    setEditingCollege(college);
    setFormData({
      name: college.name,
      location: college.location,
      students: college.students,
      established: college.established
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this college?')) {
      setCollegeList(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCollege) {
      setCollegeList(prev => prev.map(c => 
        c.id === editingCollege.id 
          ? { ...c, ...formData }
          : c
      ));
    } else {
      const newCollege = {
        id: Date.now().toString(),
        ...formData
      };
      setCollegeList(prev => [...prev, newCollege]);
    }
    setShowModal(false);
  };

  const CollegeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {editingCollege ? 'Edit College' : 'Add New College'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">College Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Students</label>
            <input
              type="number"
              required
              value={formData.students}
              onChange={(e) => setFormData(prev => ({ ...prev, students: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Established Year</label>
            <input
              type="text"
              required
              value={formData.established}
              onChange={(e) => setFormData(prev => ({ ...prev, established: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
            >
              {editingCollege ? 'Update' : 'Add'} College
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <Layout title="Colleges Management">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Colleges & Institutions</h2>
          <p className="text-gray-600">Manage registered colleges and their details.</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add College</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collegeList.map((college) => (
          <div key={college.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Building className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{college.name}</h3>
                  <p className="text-sm text-gray-600">{college.location}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(college)}
                  className="p-1 text-gray-400 hover:text-blue-600"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(college.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Students:</span>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{college.students.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Established:</span>
                <span className="font-medium">{college.established}</span>
              </div>
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              View Students & Submissions
            </button>
          </div>
        ))}
      </div>

      {showModal && <CollegeModal />}
    </Layout>
  );
};

export default Colleges;