import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/appointment/${doctor._id}`)}
            className='bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden border border-slate-200'
        >
            {/* Profile Image */}
            <div className='relative bg-slate-100 h-48 flex items-center justify-center'>
                <img
                    src={doctor.profileImage || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=faces'}
                    alt={doctor.userId?.name}
                    className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-md'
                />
                {doctor.available !== false && (
                    <span className='absolute top-3 right-3 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full'>
                        Available
                    </span>
                )}
            </div>

            {/* Doctor Info */}
            <div className='p-6'>
                <h3 className='text-lg font-semibold text-slate-900 mb-1'>
                    {doctor.userId?.name || 'Dr. Unknown'}
                </h3>
                <p className='text-sm text-slate-600 mb-4'>
                    {doctor.specialization}
                </p>

                <div className='flex items-center justify-between pt-4 border-t border-slate-100'>
                    <div className='flex items-center gap-1'>
                        <span className='text-yellow-500'>⭐</span>
                        <span className='text-sm font-semibold text-slate-700'>4.8</span>
                    </div>
                    <div className='text-lg font-bold text-indigo-600'>
                        ₹{doctor.fees}
                    </div>
                </div>

                <button className='w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-full font-semibold transition-colors'>
                    Book Appointment
                </button>
            </div>
        </div>
    );
};

export default DoctorCard;
