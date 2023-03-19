import React, {useState} from 'react';

const MainPage = () => {
    const [task, setTask]=useState();
    const [duedate, setDuedate]=useState();
    const [priority, setPriority]=useState();
    const [status, setStatus]=useState();

    const handleSubmit = () => {
        fetch("http://localhost:3001/api/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                task: task,
                duedate: duedate,
                priority: priority,
                status: status,
            }),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

        })
    }


    const handleChanges = (e) => {
        e.preventDefault();
      if (e.target.name === "task") {
        setTask(e.target.value);
      }
        if (e.target.name === "duedate") {
        setDuedate(e.target.value);
        }
        if (e.target.name === "priority") {
        setPriority(e.target.value);
        }
        if (e.target.name === "status") {
        setStatus(e.target.value);
        }

    }


    return (
        <div>
            <h1>Create New Task</h1>
<form>
    <label>Task</label>
    <input type="text" name="task" onChange={handleChanges}/>
    <label>Due Date</label>
    <input type="date" name="duedate" onChange={handleChanges}/>
    <label>Priority</label>
    <input type="text" name="priority" onChange={handleChanges}/>
    <label>Status</label>
    <input type="text" name="status" onChange={handleChanges}/>
    <button onClick={handleSubmit}>Submit</button>
</form>
            <div>
                <a>
                    <button>View All Tasks</button>
                </a>
        </div>
        </div>


    );
};

export default MainPage;