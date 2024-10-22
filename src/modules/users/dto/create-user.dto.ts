export class CreateUserDto {
    fullName!: string;
    password!: string;
    email!: string;
    birthDate?: Date;
    phoneNumber?: string;
}
