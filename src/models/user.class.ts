export class User {
    firstName: string;
    lastName: string;
    birthDate: number;
    street: string;
    zipCode: number;
    city: string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : ''; //Auch eine Form von if-else-Abfragen.
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
    }

     toJSON(): any {
        return  {
        firstName: this.firstName,
        lastName: this.lastName,
        birthDate: this.birthDate,
        street: this.street,
        zipCode: this.zipCode,
        city: this.city,
        }
    }
}