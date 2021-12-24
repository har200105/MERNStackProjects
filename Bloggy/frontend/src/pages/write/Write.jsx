import "./write.css";
import axios from 'axios';
import { API } from "../../API";
import { useEffect, useRef, useState } from "react";

export default function Write() {

  const titleRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [file,setFile] = useState();
  const [posting,setPosting]=useState(false);


  const readImage = (e) =>{
    console.log(e)
    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState===2){
        setFile(reader.result);
      }
    }
    reader.readAsDataURL(e.target.files[0]) 
  }

  const getCats = async () => {

    await axios.get(`${API}/getCategories`).then((s) => {
      if (s.status === 201) {
        setCategories(s.data);
      }
    });

  }

  useEffect(() => {
    getCats();
  }, []);

  const postBlog = async (e) => {

    e.preventDefault();

    setPosting(true);

    
    if(titleRef.current.value==="" || !titleRef.current.value){
      setError("Please Add Title");
      setPosting(false);
      return;
    }


    if(descRef.current.value==="" || !descRef.current.value){
      setError("Please Add Description");
      setPosting(false);
      return;
    }

    if (categoryRef.current.value == 0) {
      setError("Please Select a Category");
      setPosting(false);
      console.log("Please Select a Category");
      return;
    }




    await axios.post(`${API}/addPost`, {
      title: titleRef.current.value,
      desc: descRef.current.value,
      category:categoryRef.current.value,
      file
    }, {
      headers: {
        "Authorization": localStorage.getItem("jwt")
      }
    }).then((pst)=>{
      if(pst.status===201){
        window.location.replace("/");
      }
    });
  }

  return (
    <div className="write">
          <h4 style={{
            color: "red",
            textAlign: "center",
            justifyContent: "center",
            margin:"auto"
          }}>
            {error}
          </h4>
      <img
        className="writeImg"
        src={
              file ? file :
          "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
      
      }
        alt=""
      />
      <select
        ref={categoryRef}
        onChange={() => {
          console.log(categoryRef.current.value)
          setError("")
        }}
       className="news"
      >
        <option value={0}>Categories</option>
        {
          categories?.map((c) => (
            <option value={c._id} >{c.name}</option>
          ))
        }
      </select>
      <form className="writeForm" onSubmit={postBlog}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} onChange={readImage} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            ref={titleRef}
            onChange={()=>setError("")}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Write Something ........"
            type="text"
            autoFocus={true}
            ref={descRef}
            onChange={()=>setError("")}
          />
      
        </div>

        <button className="writeSubmit" type="submit" disabled={posting}>
          Publish
        </button>

      </form>
    </div>
  );
}
