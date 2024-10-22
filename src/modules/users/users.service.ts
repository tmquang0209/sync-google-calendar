import { Injectable } from "@nestjs/common";
import { FirebaseAdminService } from "src/common/database/firebase.service";
import { HelperService } from "src/common/helpers";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    private db: FirebaseFirestore.Firestore;

    constructor(private readonly firebaseAdminService: FirebaseAdminService) {
        const adminInstance = this.firebaseAdminService.getFirebaseAdmin();
        if (adminInstance) {
            this.db = adminInstance.firestore(); // Get the Firestore instance from the initialized Firebase Admin SDK
        } else {
            throw new Error("Firebase Admin SDK is not initialized");
        }
    }

    async create(createUserDto: CreateUserDto) {
        // check if user exists
        const usersRef = await this.db.collection("users").get();
        const users = usersRef.docs.map((doc) => doc.data());

        const isExists = users.find((u) => u.email === createUserDto.email);
        if (isExists) {
            throw new Error("User already exists");
        }

        // if user does not exist, create user

        // hash password
        const hashPassword = await HelperService.hashString(
            createUserDto.password,
        );
        createUserDto.password = hashPassword;

        const created = await this.db.collection("users").add(createUserDto);
        return created;
    }

    findAll() {
        return `This action returns all users`;
    }

    async findOne(id: string) {
        const usersRef = this.db.collection("users").doc(id);
        return usersRef.get().then((doc) => {
            if (doc.exists) {
                return doc.data();
            } else {
                return null;
            }
        });
    }

    async findByEmail(email: string) {
        const usersRef = await this.db.collection("users").get();

        for (const doc of usersRef.docs) {
            const data = doc.data();
            if (data.email === email) {
                return doc;
            }
        }
        return null;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        console.log(
            "🚀 ~ UsersService ~ update ~ updateUserDto:",
            updateUserDto,
        );
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
