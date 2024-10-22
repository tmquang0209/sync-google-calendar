import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as admin from "firebase-admin";
import { FirebaseAdminService } from "../database/firebase.service";

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: "FIREBASE_ADMIN",
            useFactory: (configService: ConfigService) => {
                const firebaseConfig = configService.get("firebase");

                if (!admin.apps.length) {
                    admin.initializeApp({
                        credential: admin.credential.cert({
                            clientEmail: firebaseConfig.client_email,
                            privateKey: firebaseConfig.private_key,
                            projectId: firebaseConfig.project_id,
                        }),
                    });
                }

                return admin;
            },
            inject: [ConfigService],
        },
        FirebaseAdminService,
    ],
    exports: ["FIREBASE_ADMIN", FirebaseAdminService],
})
export class FirebaseModule {}
