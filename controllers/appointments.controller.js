import { Appointment } from "../models/appointments.model.js";

// Helper: Check if an appointment already exists for the same date and time
const checkAppointment = async (appointmentDate, appointmentTime) => {
    try {
        const existingAppointment = await Appointment.findOne({
            appointmentDate,
            appointmentTime
        });
        return !!existingAppointment;
    } catch (error) {
        console.error("Error checking appointment:", error);
        throw new Error("Failed to check appointment availability");
    }
};

// Controller: Create a new appointment
const createAppointment = async (req, res) => {
    try {
        const { appointmentDate, appointmentTime, email, fullname, phonenumber } = req.body;

        // Basic validation
        if (!appointmentDate || !appointmentTime || !email || !fullname || !phonenumber) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check for existing appointment
        const isAlreadyBooked = await checkAppointment(appointmentDate, appointmentTime);
        if (isAlreadyBooked) {
            return res.status(400).json({ message: "Appointment slot already booked. Please choose another time." });
        }

        // Create and save the new appointment
        const newAppointment = new Appointment({
            appointmentDate,
            appointmentTime,
            email,
            fullname,
            phonenumber
        });

        await newAppointment.save();

        return res.status(201).json({
            message: "Appointment created successfully",
            data: newAppointment
        });

    } catch (error) {
        console.error("Error creating appointment:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Controller: Get booked appointments
const getBookedAppointments = async (req, res) => {
    try {
        const {  appointmentTime } = req.query;
        const {appointmentDate}= req.params;
        // Build dynamic query object
        const query = {};
        if (appointmentDate) query.appointmentDate = appointmentDate;
        if (appointmentTime) query.appointmentTime = appointmentTime;

        const bookedAppointments = await Appointment.find(query).sort({ appointmentTime: 1 });

        return res.status(200).json({
            message: "Booked appointments retrieved successfully",
            data: bookedAppointments
        });

    } catch (error) {
        console.error("Error retrieving booked appointments:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export { createAppointment, checkAppointment, getBookedAppointments };
