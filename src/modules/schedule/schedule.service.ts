import { Injectable } from "@nestjs/common";
import { FirebaseAdminService } from "src/common/database/firebase.service";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";

@Injectable()
export class ScheduleService {
    private db: FirebaseFirestore.Firestore;

    constructor(private readonly firebaseAdminService: FirebaseAdminService) {
        const adminInstance = this.firebaseAdminService.getFirebaseAdmin();
        if (adminInstance) {
            this.db = adminInstance.firestore(); // Get the Firestore instance from the initialized Firebase Admin SDK
        } else {
            throw new Error("Firebase Admin SDK is not initialized");
        }
    }

    async create(createScheduleDto: CreateScheduleDto) {
        const scheduleRefs = this.db.collection("schedules");
        const created = await scheduleRefs.add(createScheduleDto); // Firestore method for adding a document
        return created;
    }

    async findAll() {
        const snapshot = await this.db.collection("schedules").get();
        const schedules = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return schedules;
    }

    async findOne(id: string) {
        const details = await this.db.collection("schedules").doc(id).get();
        return details.data();
    }

    async update(id: string, updateScheduleDto: UpdateScheduleDto) {
        await this.db
            .collection("schedules")
            .doc(id)
            .update(id, updateScheduleDto);
        return {
            success: true,
            message: "Schedule updated successfully",
        };
    }

    remove(id: string) {
        return `This action removes a #${id} schedule`;
    }
}
