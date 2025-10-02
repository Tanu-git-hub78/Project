import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Plus, CreditCard as Edit, Trash2, Bell, Calendar, CircleAlert as AlertCircle } from 'lucide-react';
import { adminNotifications } from '../../data/mockData';
import { Notification } from '../../types';

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(adminNotifications);
  const [showModal, setShowModal] = useState(false);
  const [editingNotification, setEditingNotification] = useState<Notification | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'general' as 'deadline' | 'format' | 'general'
  });

  const handleAdd = () => {
    setEditingNotification(null);
    setFormData({ title: '', message: '', type: 'general' });
    setShowModal(true);
  };

  const handleEdit = (notification: Notification) => {
    setEditingNotification(notification);
    setFormData({
      title: notification.title,
      message: notification.message,
      type: notification.type
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isActive: !n.isActive } : n
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNotification) {
      setNotifications(prev => prev.map(n => 
        n.id === editingNotification.id 
          ? { ...n, ...formData }
          : n
      ));
    } else {
      const newNotification: AdminNotification = {
        id: Date.now().toString(),
        ...formData,
        createdDate: new Date().toISOString().split('T')[0],
        isActive: true
      };
      setNotifications(prev => [newNotification, ...prev]);
    }
    setShowModal(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deadline': return <Calendar className="h-5 w-5 text-red-600" />;
      case 'format': return <AlertCircle className="h-5 w-5 text-blue-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'deadline': return 'bg-red-100 text-red-800';
      case 'format': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const NotificationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {editingNotification ? 'Edit Notification' : 'Create New Notification'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter notification title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="general">General</option>
              <option value="deadline">Deadline</option>
              <option value="format">Format Update</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter notification message"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
            >
              {editingNotification ? 'Update' : 'Create'} Notification
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
    <Layout title="Notifications Management">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications Management</h2>
          <p className="text-gray-600">Create and manage notifications for students.</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <Plus className="h-5 w-5" />
          <span>Create Notification</span>
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getTypeIcon(notification.type)}
                  <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadge(notification.type)}`}>
                    {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    notification.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {notification.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{notification.message}</p>
                <p className="text-sm text-gray-500">
                  Created: {new Date(notification.createdDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleToggleActive(notification.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    notification.isActive 
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {notification.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => handleEdit(notification)}
                  className="p-2 text-gray-400 hover:text-blue-600"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(notification.id)}
                  className="p-2 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
          <p className="text-gray-600 mb-4">Create your first notification to keep students informed.</p>
          <button
            onClick={handleAdd}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Create Notification
          </button>
        </div>
      )}

      {showModal && <NotificationModal />}
    </Layout>
  );
};

export default Notifications;