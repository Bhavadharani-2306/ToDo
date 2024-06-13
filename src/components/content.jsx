import React, { useEffect, useState } from 'react'
import tasking from "../assets/tasking.png"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.png"
import { useNavigate } from 'react-router-dom'
import { auth,db} from './firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'

function Content() {
  const[Tasks,setTasks]=useState([])
  const[Newtask,setNewtask]=useState('')
  const[Edittask,setEdittask]=useState(null)
  const navigate=useNavigate()
  const [name,setName]=useState()
  const [dp,setDp]=useState()


  useEffect(()=>{
    const displayData=auth.onAuthStateChanged(user=> {

    if (user){
      setName(user.displayName)
      setDp(user.photoURL)
    }
    else{
      navigate("/")
    }
  })
    return()=>displayData()
  },[navigate])

  const taskref=collection(db,'TaskCollection')

  useEffect(()=>{
    const gettasks=async()=>{
      const data = await getDocs(taskref)
      console.log(data)
      const filtereddata = data.docs.map(doc => ({...doc.data(),id:doc.id}))
      setTasks(filtereddata)
        }
    gettasks()
  },);

  const Inputchange=(e)=>{
    setNewtask(e.target.value)
  }

  const Onsubmit=async()=> {
    setNewtask('')
    if(Edittask) {
      const updateref=doc(db,'TaskCollection',Edittask.id)
      await updateDoc(updateref,{text:Newtask})
      setEdittask(null)} 
    else{
    await addDoc(taskref,{text:Newtask,completed:false})
    }
  }

  const deletetask=async(task)=>{
    const docref=doc(db,'TaskCollection',task.id)
    await deleteDoc(docref)
  }

  const updatetask=async(task)=>{
    setNewtask(task.text)
    setEdittask(task)
  }

const complete=async(task)=>{
  const radioref=doc(db,'TaskCollection',task.id)
  await updateDoc(radioref,{completed:true})
}

  return (
    <div className='maincontent'>
        {/* leftcontent */}
        <div className='leftcontent'>
            <img src={dp} alt="" className='img1' />
            <h2 className='h2'>Hi, {name}</h2>
            <img src={tasking} alt="" className='tasking'/>
        </div>
        
        {/* rightcontent */}
    <div className='rightcontent'>

          {/* header */}
          <div className='mytask'>
           <h1>My Tasks</h1>
          </div>

           <div className='inputcontent'>
               <input type="text" placeholder='Enter the task here' value={Newtask} onChange={Inputchange}/>
               <button onClick={Onsubmit}>Add</button>
           </div>

           <div className='tasklist'>
                <ul>
                  {
                  Tasks.map(task=>
                  <li key={task.id}>
                      <div className='taskcontent'>
                          <input type="radio" name="" id="" onClick={()=> complete(task)} checked={task.completed}/>
                          <span className={`${task.completed? 'completed':"notcompleted"}`}>{task.text}</span>            
                          <button className='updatebutton' onClick={()=> updatetask(task)}>
                            <img src={img2} alt="" className='image'/>
                          </button>
                          <button className='deletebutton' onClick={()=> deletetask(task)}>
                          <img src={img3} alt="" className='image'/>
                          </button>

                      </div>
                  </li>
                  )}
                </ul>
           </div>
    </div>
    </div>
  )
}

export default Content