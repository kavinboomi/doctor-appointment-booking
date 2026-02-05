import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import DoctorCard from '../components/DoctorCard';

const Home = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/doctors');
                setDoctors(data.slice(0, 8));
            } catch (error) {
                console.error(error);
            }
        };
        fetchDoctors();
    }, []);

    const specialties = [
        { name: 'General Physician', icon: '🩺' },
        { name: 'Gynecologist', icon: '👶' },
        { name: 'Dermatologist', icon: '✨' },
        { name: 'Pediatrician', icon: '🧸' },
        { name: 'Neurologist', icon: '🧠' },
        { name: 'Gastroenterologist', icon: '🫀' }
    ];

    return (
        <div className='bg-slate-50'>
            {/* Hero Section */}
            <section className='bg-white border-b border-slate-200'>
                <Container className='py-16'>
                    <div className='grid md:grid-cols-2 gap-12 items-center'>
                        {/* Left Content */}
                        <div>
                            <h1 className='text-4xl md:text-5xl font-bold text-slate-900 mb-4'>
                                Book Appointments With Trusted Doctors
                            </h1>
                            <p className='text-lg text-slate-600 mb-8'>
                                Connect with verified healthcare professionals. Schedule consultations, manage appointments, and prioritize your health.
                            </p>

                            <button
                                onClick={() => navigate('/doctors')}
                                className='bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-full font-semibold transition-colors inline-flex items-center gap-2'
                            >
                                Book Appointment
                                <span>→</span>
                            </button>

                            {/* Stats */}
                            <div className='flex gap-8 mt-12'>
                                <div>
                                    <div className='text-3xl font-bold text-slate-900'>500+</div>
                                    <div className='text-sm text-slate-600'>Doctors</div>
                                </div>
                                <div>
                                    <div className='text-3xl font-bold text-slate-900'>10k+</div>
                                    <div className='text-sm text-slate-600'>Patients</div>
                                </div>
                                <div>
                                    <div className='text-3xl font-bold text-slate-900'>4.8★</div>
                                    <div className='text-sm text-slate-600'>Rating</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className='relative'>
                            <img
                                src='https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=700&fit=crop&crop=faces'
                                alt='Doctor'
                                className='w-full h-auto rounded-2xl shadow-lg'
                            />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Specialties Section */}
            <section className='py-16'>
                <Container>
                    <div className='text-center mb-12'>
                        <h2 className='text-3xl font-bold text-slate-900 mb-3'>Find by Speciality</h2>
                        <p className='text-slate-600'>Browse doctors by their area of expertise</p>
                    </div>

                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4'>
                        {specialties.map((specialty, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/doctors/${specialty.name}`)}
                                className='bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border border-slate-200 text-center'
                            >
                                <div className='text-4xl mb-3'>{specialty.icon}</div>
                                <h3 className='text-sm font-semibold text-slate-900'>
                                    {specialty.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Top Doctors Section */}
            <section className='py-16'>
                <Container>
                    <div className='text-center mb-12'>
                        <h2 className='text-3xl font-bold text-slate-900 mb-3'>Top Doctors to Book</h2>
                        <p className='text-slate-600'>Highly rated and verified healthcare professionals</p>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {doctors.map((doctor, index) => (
                            <DoctorCard key={index} doctor={doctor} />
                        ))}
                    </div>

                    <div className='text-center mt-12'>
                        <button
                            onClick={() => navigate('/doctors')}
                            className='bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold transition-colors'
                        >
                            View All Doctors
                        </button>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default Home;
