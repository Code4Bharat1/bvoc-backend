import {createAppointment,
    checkAppointment,getBookedAppointments
} from "../controllers/appointments.controller.js";
import { Router } from "express";


const router= Router();
router.post("/", createAppointment);

router.post("/check", checkAppointment);

router.get("/getAppointments/:date", getBookedAppointments);

export default router;