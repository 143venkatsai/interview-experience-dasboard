import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');

  const fetchAllTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/tasks', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/admin/task/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchAllTasks();
  };

  useEffect(() => { fetchAllTasks(); }, [token]);
  
  return (
    <div>
      <h1 className='text-center text-3xl font-bold my-8'>Interview Experience</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">S.No</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Company</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, idx) => (
            <tr key={task._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{idx + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{task.title}</td>
              <td className="border border-gray-300 px-4 py-2">{task.company}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(task.date).toLocaleDateString()}</td>              
              <td className="border border-gray-300 px-4 py-2">{task.status}</td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer"
                  onClick={() => updateStatus(task._id, 'approved')}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                  onClick={() => updateStatus(task._id, 'rejected')}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
