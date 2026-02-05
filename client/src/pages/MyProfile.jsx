import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
    const [userData, setUserData] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return

                const { data } = await axios.get('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setUserData(data)
            } catch (error) {
                console.error(error)
                toast.error("Failed to load profile")
            }
        }
        fetchProfile()
    }, [])

    const updateUser = async () => {
        // Placeholder for update API call
        setIsEdit(false)
        toast.success("Profile updated (Frontend only in this demo)")
    }

    return userData ? (
        <div className='max-w-lg flex flex-col gap-2 text-sm'>
            <img className='w-36 rounded' src={userData.image || "https://via.placeholder.com/150"} alt="" />

            {isEdit
                ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
                : <p className='text-3xl font-medium text-neutral-800 mt-4'>{userData.name}</p>
            }

            <hr className='bg-zinc-400 h-[1px] border-none' />

            <div>
                <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Email id:</p>
                    <p className='text-blue-500'>{userData.email}</p>
                    <p className='font-medium'>Phone:</p>
                    {isEdit
                        ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone || '+1 123 456 7890'} />
                        : <p className='text-blue-400'>{userData.phone || '+1 123 456 7890'}</p>
                    }
                    <p className='font-medium'>Address:</p>
                    {isEdit
                        ? <p><input className='bg-gray-50' type="text" value={userData.address?.line1 || "Line 1"} /> <br /> <input className='bg-gray-50' type="text" value={userData.address?.line2 || "Line 2"} /></p>
                        : <p className='text-gray-500'>{userData.address?.line1 || "Line 1"} <br /> {userData.address?.line2 || "Line 2"}</p>
                    }
                </div>
            </div>

            <div>
                <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Gender:</p>
                    {isEdit
                        ? <select className='max-w-20 bg-gray-100' value={userData.gender || 'Male'}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        : <p className='text-gray-400'>{userData.gender || 'Male'}</p>
                    }
                </div>
            </div>

            <div className='mt-10'>
                {
                    isEdit
                        ? <button onClick={updateUser} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Save information</button>
                        : <button onClick={() => setIsEdit(true)} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Edit</button>
                }
            </div>
        </div>
    ) : <p>Loading...</p>
}

export default MyProfile
