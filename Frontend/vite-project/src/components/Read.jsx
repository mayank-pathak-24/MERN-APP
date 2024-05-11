import React, { useEffect, useState } from 'react';
import './CRD.css';
import { Link } from 'react-router-dom';

const Read = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    async function getData() {
        try {
            const response = await fetch("http://localhost:5000");
            if (!response.ok) {
                console.log(result.error);
                setError(result.error);
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error.message);
        }
    }
    const handleDelete=async(id)=>
    {
        const responce=await fetch(`http://localhost:5000/${id}`,{method:"DELETE"});
        const result =await responce.json()
        if(!responce.ok)
            {
                console.log(result.error);
                setError(result.error);
            }
        if(responce.ok)
            {
                setError("Deleted Succesfully");
                setTimeout(()=>{
                    setError("");
                    getData();
                },1000);
            }    
    }
   

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container my-2">
            <h2 className='text-center mb-4'>All data</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className='row'>
                {data.map((ele) => (
                    <div key={ele._id} className='col-md-4 mb-4'>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{ele.name}</h5>
                                <h6 className='card-subtitle mb-2 text-muted'>{ele.email}</h6>
                                <h6 className="card-subtitle mb-2 text-muted">{ele.age}</h6>
                                <a href="#" className="card-link" onClick={()=>handleDelete(ele._id)}>Delete</a>
                                <Link to ={`/${ele._id}`}  className="card-link">Edit</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Read;
