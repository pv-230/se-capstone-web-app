export class UserData {
  constructor(firstName, lastName, email, completedClasses, outstandingClasses, percentDone) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.completedClasses = completedClasses;
    this.outstandingClasses = outstandingClasses;
    this.percentDone = percentDone;
  }
  toString() {
    return (`
                First Name: ${this.firstName}
                Last Name: ${this.lastName}
                Email: ${this.email}
                Completed Classes: ${this.completedClasses}
                Outstanding Classes: ${this.outstandingClasses}
                Percent Done: ${this.percentDone}`);
  }
  completeClass(classCode) {
    let classPos = this.outstandingClasses.indexOf(classCode);
    if (classPos !== -1) {
      this.outstandingClasses.splice(classPos, 1);
      this.completedClasses.push(classCode);
    }
    else
      console.log("Error, that is not an outstanding class");
  }
  getJSONObject() {
    const JSONData = {
      "FirstName": JSON.stringify(this.firstName),
      "LastName": JSON.stringify(this.lastName),
      "Email": JSON.stringify(this.email),
      "CompletedClasses": JSON.stringify(this.completedClasses),
      "OutstandingClasses": JSON.stringify(this.outstandingClasses),
      "PercentDone": JSON.stringify(this.percentDone)
    };
    return JSONData;
  }
}
