export class NameData {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    toString() {
        return (`
                First Name: ${this.firstName}
                Last Name: ${this.lastName}`);
    }
    getJSONObject() {
        const JSONData = {
            "FirstName": JSON.stringify(this.firstName),
            "LastName": JSON.stringify(this.lastName),
        };
        return JSONData;
    }
}