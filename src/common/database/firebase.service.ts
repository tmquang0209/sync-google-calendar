import { Inject, Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";

@Injectable()
export class FirebaseAdminService {
    constructor(
        @Inject("FIREBASE_ADMIN") private readonly firebaseAdmin: typeof admin, // Inject the admin instance
    ) {}

    getFirebaseAdmin() {
        return this.firebaseAdmin; // Return the injected Firebase Admin SDK
    }
}
