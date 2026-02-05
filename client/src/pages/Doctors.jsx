import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Container from '../components/Container';
import DoctorCard from '../components/DoctorCard';

const Doctors = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [filterDoc, setFilterDoc] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const specialization = searchParams.get('speciality');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/doctors');
                setDoctors(data);
                setFilterDoc(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDoctors();
    }, []);

    useEffect(() => {
        if (specialization) {
            setFilterDoc(doctors.filter(doc => doc.specialization === specialization));
        } else {
            setFilterDoc(doctors);
        }
    }, [doctors, specialization]);

    const specializations = ['General Physician', 'Gynecologist', 'Dermatologist', 'Pediatrician', 'Neurologist', 'Gastroenterologist'];

    return (
        <div className='bg-slate-50 min-h-screen py-16'>
            <Container>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-slate-900 mb-2'>Find Doctors</h1>
                    <p className='text-slate-600'>Browse through our specialist doctors</p>
                </div>

                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* Sidebar Filters */}
                    <div className='lg:w-64 flex-shrink-0'>
                        <div className='bg-white rounded-2xl shadow-sm p-6 border border-slate-200 sticky top-24'>
                            <h3 className='font-semibold text-slate-900 mb-4'>Filter by Speciality</h3>
                            <div className='space-y-2'>
                                {specializations.map((spec, index) => (
                                    <button
                                        key={index}
                                        onClick={() => specialization === spec ? navigate('/doctors') : navigate(`/doctors?speciality=${spec}`)}
                                        className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${specialization === spec
                                                ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                                : 'text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        {spec}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Doctor Grid */}
                    <div className='flex-1'>
                        {filterDoc.length > 0 ? (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {filterDoc.map((doctor, index) => (
                                    <DoctorCard key={index} doctor={doctor} />
                                ))}
                            </div>
                        ) : (
                            <div className='bg-white rounded-2xl shadow-sm p-12 text-center border border-slate-200'>
                                <p className='text-slate-600'>No doctors found for this specialization</p>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Doctors;
