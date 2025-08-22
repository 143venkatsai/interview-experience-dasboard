import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader"


const User = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({title: "", date: "", company: ""});
  const [rounds, setRounds] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchInterview = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/task", {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("API response: ", res.data);
    setTasks(res.data.tasks);  
  } catch (err) {
    console.log(err);
    setError("Failed to fetch Interviews");
    setTasks([]);
  }
};

  useEffect(() => {
    if(token) fetchInterview();
  }, [token]);

  console.log(tasks)


  const addRound = () =>{
    setRounds([...rounds, {roundName: "", questions: "" }]);
  }

  const updatedRound = (idx, field, value) =>{
    const updated = rounds.map((r, i) => i === idx ? { ...r, [field]: value } : r);  
    setRounds(updated);
  }

  const closeRound = (idx) =>{
    const updated = rounds.filter((r,i) => i !== idx);
    setRounds(updated);
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setError("");
    setLoading(true);
    try{
      await axios.post("http://localhost:5000/api/task", {...form, rounds}, {headers: {Authorization: `Bearer ${token}`}});
      setForm({title:"", date:"", company:"", });
      setRounds([{roundName: "", questions:""}]);
      await fetchInterview();
      setLoading(false)
    }catch(err){
      console.log(err);
      setError("Failed to submit task")
    }
    
  }

  return (
    <div className='min-h-screen bg-blue-200 py-10 px-5'>
      <h1 className='text-center text-3xl font-bold mb-8'>Interview Experience</h1>
      <div className='bg-white p-5 max-w-xl rounded-lg shadow-xl mx-auto'>
        <h1 className='text-center font-bold text-2xl'>Interview Details</h1>
        <form onSubmit={handleSubmit}>
          {/* title */}
          <div className='flex flex-col mb-2'>
            <label htmlFor="title" className='text-gray-500 font-semibold text-md mb-1'>Title</label>
            <input className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200' placeholder='Enter Topic' id="title" type="text" value={form.title} onChange={(e) =>setForm({...form, title: e.target.value})} required />
          </div>
          {/* company name */}
          <div className='flex flex-col mb-2'>
            <label htmlFor="company"  className='text-gray-500 font-semibold text-md mb-1'>Company</label>
            <input className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200' placeholder='Enter Company Name' id="company" type="text" value={form.company} onChange={(e) =>setForm({...form, company: e.target.value})} required />
          </div>
          {/* date */}
          <div className='flex flex-col mb-2'>
            <label htmlFor="date" className='text-gray-500 font-semibold text-md mb-1'>Date</label>
            <input className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200' id="date" type="date" value={form.date} onChange={(e) =>setForm({...form, date: e.target.value})} required />
          </div>
          {/* interview rounds */}
          <div className='mt-4'>
            <div className='flex justify-between items-center'>
              <p className='text-gray-500 font-semibold text-md mb-1'>Interview Rounds:</p>
              <button type='button' className='border border-gray-300 px-2 py-1 rounded cursor-pointer shadow-lg' onClick={addRound}>+ Add Round</button>
            </div>
            {rounds.map((round, idx) =>(
              <div key={idx} className='flex flex-col border border-gray-300 px-4 py-2 rounded shadow-lg mt-2 mb-2 '>
                <div className='flex flex-col mb-2'>
                  <label htmlFor={`roundName-${idx}`}  className='text-gray-500 font-semibold text-md mb-1'>Round Name</label>
                  <input className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200' id={`roundName-${idx}`} onChange={(e) => updatedRound(idx, "roundName", e.target.value)} placeholder='Round Name' type="text" value={round.roundName} required />
                </div>
                <div className='flex flex-col mb-2'>
                  <label htmlFor={`question-${idx}`}  className='text-gray-500 font-semibold text-md mb-1'>Questions</label>
                  <input className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200' id={`question-${idx}`} onChange={(e) => updatedRound(idx, "questions", e.target.value)} placeholder='Questions' type="text" value={round.questions} required />
                </div>
                <button type='button' className='ml-auto border border-gray-300 shadow-lg rounded-lg px-4 py-1 cursor-pointer' onClick={() => closeRound(idx)}>Close</button>
              </div>
            ))
            }
          </div>
          <button type='submit' className='my-3 px-4 py-2 text-lg text-white font-semibold bg-blue-500 rounded-lg shadow-xl cursor-pointer'>
            {loading? (<BeatLoader color="#ffffff" size={10} data-testid="loader" />) : "Submit"}
          </button>
          {error && <p className='text-red-500'>{error}</p>}
        </form>
      </div>
      {/* interviews list */}
      <h1 className='text-center font-bold mb-4 text-xl mt-10'>My Interviews</h1>
      <div>
        {tasks.length === 0 ? (
          <p className='text-center font-bold mt-10'>No Data</p>
        ): (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map(task => (
              <div key={task._id} className="border border-gray-300 px-4 py-4 rounded bg-white shadow-xl" >
                <div><b>Title:</b> {task.title}</div>
                <div><b>Date:</b> {new Date(task.date).toLocaleDateString()}</div>
                <div><b>Company:</b> {task.company}</div>
                <div>
                  <b>Status:</b>
                  <span style={{
                    color:
                      task.status === "approved" ? "green" :
                        task.status === "rejected" ? "red" :
                          "orange",
                      fontWeight: "bold", marginLeft: "6px"
                  }}>
                    {task.status}
                  </span>
                </div>
                {task.rounds && task.rounds.length > 0 && (
                  <div className="mt-2">
                    <b>Interview Rounds:</b>
                    <ul className="flex flex-col gap-2 mt-2">
                      {task.rounds.map((round, idx) => (
                        <li key={idx} className="border border-gray-300 px-2 py-1 rounded shadow-lg">
                          <b>Round {idx + 1}:</b> {round.roundName}, <b>Questions:</b> {round.questions}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
     
    </div>
  )
}

export default User