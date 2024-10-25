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

    async create(createScheduleDto: CreateScheduleDto, userId: string) {
        const scheduleRefs = this.db.collection("schedules");
        const created = await scheduleRefs.add({
            ...createScheduleDto,
            userId,
            createdAt: new Date(),
        }); // Firestore method for adding a document
        return (await scheduleRefs.doc(created.id).get()).data();
    }

    async findAll() {
        const snapshot = await this.db.collection("schedules").get();
        const schedules: {
            id: string;
            title: string;
            description: string;
            startDate: Date;
            endDate: Date;
        }[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate,
            };
        });
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

    async remove(id: string) {
        await this.db.collection("schedules").doc(id).delete();
    }
}
