const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const bcrypt = require('bcryptjs');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await connectDB();

        await User.deleteMany();
        await Doctor.deleteMany();

        // Admin User
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash('123456', salt);

        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@gmail.com',
            password: hashPassword,
            role: 'admin'
        });

        // Doctors
        const specialties = ['General Physician', 'Dentist', 'Dermatologist', 'ENT', 'Pediatrician', 'Gynecologist', 'Orthopedic'];

        for (let i = 0; i < 10; i++) {
            const user = await User.create({
                name: `Doctor ${i + 1}`,
                email: `doctor${i + 1}@gmail.com`,
                password: hashPassword,
                role: 'doctor'
            });

            await Doctor.create({
                userId: user._id,
                specialization: specialties[i % specialties.length],
                experienceYears: Math.floor(Math.random() * 20) + 1,
                clinicName: `Clinic ${i + 1}`,
                city: 'Coimbatore',
                address: `Some Address ${i + 1}, Coimbatore`,
                fees: (Math.floor(Math.random() * 5) + 3) * 100,
                approved: i < 7, // 70% approved
                availability: [
                    { date: '2026-02-05', slots: ['10:00', '10:30', '11:00'] },
                    { date: '2026-02-06', slots: ['14:00', '14:30', '15:00'] }
                ]
            });
        }

        // Patients
        await User.create({
            name: 'John Patient',
            email: 'patient@gmail.com',
            password: hashPassword,
            role: 'patient'
        });

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
