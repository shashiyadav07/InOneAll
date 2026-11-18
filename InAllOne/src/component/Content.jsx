
import { useState } from "react";
import "../style/Content.css";
function Content() {
 const [data, setData] = useState({
    link: "",
    category: "",
    course: "",
    branch: "",
    semester: "",
    subject: "",
    description: ""
});

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
     try{
        const response = await fetch("http://localhost:3000/content",{
            method: "post",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        console.log(result);
        if(response.status === 200){
           console.log("Data uploaded successfully");
           alert("Data uploaded successfully");
           setData({
                    link: "",
                     category: "",
                     course: "",
                     branch: "",
                     semester: "",
                     subject: "",
                     description: ""
                       });
        }
    }
    catch(error){
        console.log(error);
        alert("Error uploading data");
    }
};
   

    return (
        <div className="content">

            <h2>Share a Resource</h2>

            <form onSubmit={handleSubmit}>

                {/* Link */}
                <div className="resource">
                    <label>Resource Link</label>

                    <input 
                        type="url"
                        placeholder="Paste movie, notes, course or topic link"
                        value={data.link}
                        onChange={(e)=>setData({...data,link:e.target.value})}
                        required
                    />
                </div>

                {/* Category */}
                <div className="category-select">
                    <label>Category</label>

                    <select
                        value={data.category}
                        onChange={(e)=>setData({...data,category:e.target.value})}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="studyCore">Study</option>
                        <option value="course">Course</option>
                        <option value="notes">Notes</option>
                        <option value="movie">Movie</option>
                        <option value="song">Song</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                {data.category === "studyCore" && (
                    <div className="study-details">
                        <label>Course</label>
                        <select value={data.course} onChange={(e) => setData({ ...data,course: e.target.value})}required>
                                            <option value="">Select Course</option>
                                            <option value="BTech">B.Tech</option>
                                            <option value="BCA">BCA</option>
                                        <option value="MTech">M.Tech</option>
                                        <option value="MCA">MCA</option>
                                        <option value="Other">Other</option>
                                    </select>
                    {data.course === "BTech" && (
                        <div className="branch"> <label>Branch</label>
                        <select value={data.branch} onChange={(e) => setData({ ...data,branch: e.target.value})}required>
                                            <option value="">Select Branch</option>
                                            <option value="Computer Science">Computer Science</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Mechanical">Mechanical</option>
                                            <option value="Civil">Civil</option>
                                        </select>
                                       
 <div className="semester">
                     <label>Semester</label>
             <select value={data.semester} onChange={(e) => setData({ ...data,semester: e.target.value})}required>
                 <option value="">Select Semester</option>
                 <option value="1">1</option>
              <option value="2">2</option>
               <option value="3">3</option>
             <option value="4">4</option>
                           <option value="5">5</option>
                <option value="6">6</option>
                              <option value="7">7</option>
                                 <option value="8">8</option>
             </select>
             <label>Subject</label>
<input name="semester" type="text" placeholder="Enter subject name" value={data.subject} onChange={(e) => setData({...data, subject: e.target.value.toUpperCase()})} />
                                            </div>
                                       
                                        </div>
                                        
                    )}
                       
                    </div>
                    
                )}


                {/* Description */}
                <div className="description">
                    <label>
                        Description <span>*</span>
                    </label>

                    <textarea
                        placeholder="Write a brief description about the resource or copy paste the description from the source"
                        value={data.description}
                        onChange={(e) => setData({...data,description:e.target.value})}
                        required
                    />
                </div>

                <button type="submit">
                    Upload Link
                </button>

            </form>

        </div>
    );
}

export default Content;