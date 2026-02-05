import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
    const { docId } = useParams()
    const navigate = useNavigate()
    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    useEffect(() => {
        const fetchDocInfo = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/doctors/${docId}`)
                setDocInfo(data)
                // Initialize slots based on availability or generate placeholders
                if (data.availability && data.availability.length > 0) {
                    setDocSlots(data.availability)
                }
            } catch (error) {
                console.error(error)
                toast.error('Failed to load doctor info')
            }
        }
        fetchDocInfo()
    }, [docId])

    const bookAppointment = async () => {
        if (!slotTime) {
            toast.warn('Please select a time slot')
            return
        }

        const token = localStorage.getItem('token')
        if (!token) {
            toast.warn('Login to book appointment')
            navigate('/login')
            return
        }

        try {
            const date = docSlots[slotIndex].date // Assuming docSlots structure

            await axios.post('http://localhost:5000/api/appointments',
                { doctorId: docId, date, time: slotTime },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            toast.success('Appointment Booked!')
            navigate('/my-appointments')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Booking Failed')
        }
    }

    return docInfo ? (
        <div>
            {/* Doctor Details */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div className='bg-primary w-full sm:max-w-72 rounded-lg h-auto overflow-hidden'>
                    <img className='w-full h-auto' src={docInfo.profileImage || "https://via.placeholder.com/200"} alt="" />
                </div>
                <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0'>
                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.userId.name} <img className='w-5' src="" alt="" /></p>
                    <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                        <p>{docInfo.specialization} - {docInfo.experienceYears} Years</p>
                    </div>
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src="" alt="" /></p>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <p className='text-gray-500 font-medium mt-4'>Appointment fee: <span className='text-gray-900'>${docInfo.fees}</span></p>
                </div>
            </div>

            {/* Booking Slots */}
            <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
                <p>Booking slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {docSlots.length > 0 ? docSlots.map((item, index) => (
                        <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                            <p>{item.date}</p>
                        </div>
                    )) : <p>No slots available</p>}
                </div>

                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {docSlots.length > 0 && docSlots[slotIndex].slots.map((item, index) => (
                        <p onClick={() => setSlotTime(item)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
                            {item}
                        </p>
                    ))}
                </div>

                <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
            </div>
        </div>
    ) : <p>Loading...</p>
}

export default Appointment
