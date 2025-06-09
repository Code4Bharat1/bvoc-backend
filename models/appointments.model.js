import { Schema,mongoose } from "mongoose";


const appointmentSchema = new Schema({
    appointmentDate: {
        type: Date,
    },
    appointmentTime: {
        type: String,
       
    },
    email:{
        type:String,

    },
    fullname:{
        type:String,
        
    },
    phonenumber:{
        type:String,
        
    },

}, { timestamps: true });


export const Appointment = mongoose.model("Appointment", appointmentSchema);