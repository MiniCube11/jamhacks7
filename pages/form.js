import React, { useState } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';


export default function Contact() {
  const { user, error, isLoading } = useUser();

  const [formData, setFormData] = useState({
    EventName: "",
    EventDescription: "",
    EventType: "",
    Time: "",
    Location: ""
  })
  const [formSuccess, setFormSuccess] = useState(false)
  const [formSuccessMessage, setFormSuccessMessage] = useState("")

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  const submitForm = (e) => {
    e.preventDefault()

    const formURL = e.target.action
    const data = new FormData()

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    })

    fetch(formURL, {
      method: "POST",
      body: data,
      headers: {
        'accept': 'application/json',
      },
    }).then((response) => response.json())
    .then((data) => {
      setFormData({ 
        EventName: "",
        EventDescription: "",
        EventType: "",
        Location: ""
      })

      setFormSuccess(true)
      setFormSuccessMessage(data.submission_text)
    })
  }

  return (
    <>
      <div className="bg-slate-950 text-yellow-500 h-20 flex justify-between items-center px-7">
        <p className='font-bold text-xl'>APP NAME</p>
        {user ?
        <div className='flex'>
          <p className='mr-4'>{user.name}</p>
          <p><a className="block" href="/api/auth/logout">Logout</a></p>
        </div>
        :
        <a href="/api/auth/login">Login</a>
        }
      </div>

      <div className="flex justify-center items-center flex-col h-[calc(100vh-80px)]">
        <h2 className="font-semibold text-2xl mb-8">Post an activity</h2>
        {formSuccess ? 
          <div>{formSuccessMessage}</div> 
          : 
          <form method="POST" action="[URL]" onSubmit={submitForm}>
            <div>
              <label className="text-gray-800 mb-2">Event Name</label>
              <input className="block border border-gray-300 rounded-md w-[250px] py-1 px-2 mb-3" type="text" name="EventName" onChange={handleInput} value={formData.EventName} />
            </div>

            <div>
              <label className="text-gray-800 mb-2">Event Description</label>
              <input className="block border border-gray-300 rounded-md w-[250px] py-1 px-2 mb-3" type="text" name="EventDescription" onChange={handleInput} value={formData.EventDescription} />
            </div>

            <label className="text-gray-800 mb-2"> Select your event type </label> 
            <select id="multiple-select" multiple className="block border border-gray-300 rounded-md w-[250px] py-1 px-2 mb-3">
              <option value="1">Clubs</option>
              <option value="1">Party</option>
              <option value="1">Free Food</option>
              <option value="1">Academics</option>
            </select>

            <div>
              <label className="text-gray-800 mb-2">Time</label>
              <input className="block border border-gray-300 rounded-md w-[250px] py-1 px-2 mb-3" type="text" name="Time" onChange={handleInput} value={formData.Time} />
            </div>

            <div>
              <label className="text-gray-800 mb-2">Location</label>
              <input className="block border border-gray-300 rounded-md w-[250px] py-1 px-2 mb-3" type="text" name="Location" onChange={handleInput} value={formData.Location} />
            </div>

            <Link href="/success">
              <button className="w-[250px] px-2 py-2 mt-4 bg-slate-400 rounded-md">
                Submit
              </button>
            </Link>
          </form>
        }
      </div>
    </>
  )
}