import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem('token')
                const user = JSON.parse(localStorage.getItem('user')) // Need user ID

                if (!token || !user) return

                // Note: user object from login/register response has _id
                const { data } = await axios.get(`http://localhost:5000/api/appointments/patient/${user._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setAppointments(data)
            } catch (error) {
                console.error(error)
                toast.error('Failed to load appointments')
            }
        }
        fetchAppointments()
    }, [])

    const cancelAppointment = async (id) => {
        try {
            const token = localStorage.getItem('token')
            await axios.put(`http://localhost:5000/api/appointments/${id}`,
                { status: 'cancelled' },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            toast.success('Appointment Cancelled')
            setAppointments(prev => prev.map(item => item._id === id ? { ...item, status: 'cancelled' } : item))
        } catch (error) {
            toast.error('Failed to cancel')
        }
    }

    return (
        <div>
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
            <div>
                {appointments.map((item, index) => (
                    <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
                        <div>
                            <img className='w-32 bg-indigo-50' src={item.doctorId.profileImage || "https://via.placeholder.com/150"} alt="" />
                        </div>
                        <div className='flex-1 text-sm text-zinc-600'>
                            <p className='text-zinc-800 font-semibold'>{item.doctorId.userId.name || "Doctor"}</p> {/* Populated? Need check backend */}
                            <p>{item.doctorId.specialization}</p>
                            <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                            <p className='text-xs'>{item.doctorId.address}</p>
                            <p className='text-xs mt-1'><span className='text-sm text-zinc-700 font-medium'>Date & Time:</span> {item.date} | {item.time}</p>
                        </div>
                        <div className='flex flex-col gap-2 justify-end'>
                            {item.status === 'cancelled' && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Cancelled</button>}
                            {item.status === 'pending' && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300 rounded'>Cancel Appointment</button>}
                            {item.status === 'approved' && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Appointment Booked</button>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments
