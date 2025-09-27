import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { CreditCard, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getStudentPaymentStatus, updatePaymentStatus } from '../../data/mockData';

const Payment: React.FC = () => {
  const { user } = useAuth();
  const [paymentStatus, setPaymentStatus] = useState(getStudentPaymentStatus(user?.id || ''));
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      updatePaymentStatus(user?.id || '', 'paid');
      setPaymentStatus('paid');
      setIsProcessing(false);
      alert('Payment successful! You can now submit your projects.');
    }, 2000);
  };

  if (paymentStatus === 'paid') {
    return (
      <Layout title="Payment Status">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Completed</h2>
            <p className="text-gray-600 mb-6">
              Your payment of ₹50 has been successfully processed. You can now submit your projects.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-green-900">Payment Status:</span>
                <span className="text-green-600">Completed</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="font-medium text-green-900">Amount Paid:</span>
                <span className="text-green-600">₹50</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="font-medium text-green-900">Transaction ID:</span>
                <span className="text-green-600">TXN{Date.now()}</span>
              </div>
            </div>
            <button
              onClick={() => window.location.href = '/student/submission'}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Project Submission
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Payment">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <CreditCard className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Submission Fee</h2>
            <p className="text-gray-600">
              Complete your payment to unlock project submission features
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-blue-900 mb-2">Payment Required</h3>
                <p className="text-blue-800 text-sm">
                  A one-time fee of ₹50 is required for project submission. This fee covers:
                </p>
                <ul className="text-blue-800 text-sm mt-2 space-y-1">
                  <li>• Project evaluation and feedback</li>
                  <li>• Digital certificate generation</li>
                  <li>• Platform maintenance and support</li>
                  <li>• Same price for individual or group submissions</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Submission Fee:</span>
                  <span className="text-2xl font-bold text-gray-900">₹50</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Processing Fee:</span>
                  <span>₹0</span>
                </div>
                <hr className="my-2" />
                <div className="flex items-center justify-between font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-xl text-blue-600">₹50</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <CreditCard className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="font-medium">Credit/Debit Card</span>
                </label>
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div className="w-5 h-5 bg-orange-500 rounded mr-3"></div>
                  <span className="font-medium">UPI Payment</span>
                </label>
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={paymentMethod === 'netbanking'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div className="w-5 h-5 bg-blue-500 rounded mr-3"></div>
                  <span className="font-medium">Net Banking</span>
                </label>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-600 mb-6">
              <Lock className="h-4 w-4 mr-2" />
              <span>Your payment information is secure and encrypted</span>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? 'Processing Payment...' : 'Pay ₹50 Now'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;