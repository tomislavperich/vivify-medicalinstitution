
class Person {
    constructor(fname, lname, appointments = []) {
        this.firstName = fname;
        this.lastName = lname;
        this.appointments = appointments;
    }
}

class Doctor extends Person {
    constructor(fname, lname, specialty, patients = [], appointments) {
        super(fname, lname, appointments);
        this.specialty = specialty;
        this.patients = patients;
    }

    addPatient(patient) {
        this.patients.push(patient);
    }

    setAppointment(date, time, type, patient) {
        let newAppointment = new Appointment(date, time, type);
        this.appointments.push(newAppointment);
        patient.addAppointment(newAppointment);
    }
}

class Patient extends Person {
    constructor(fname, lname, jmbg, caseNum, doctor = null, appointments) {
        super(fname, lname, appointments);
        this.jmbg = jmbg;
        this.caseNumber = caseNum;
        this.chosenDoctor = doctor;
    }

    setDoctor(doctor) {
        this.chosenDoctor = doctor;
    }

    addAppointment(appointment) {
        this.appointments.push(appointment);
    }
}

class Appointment {
    constructor(type, date, time) {
        this.type = type;
        this.date = date;
        this.time = time;
    }
}

// Date functions
function getDateStr() {
    let today = new Date(),
        dd = today.getDate(),
        mm = today.getMonth(),
        yyyy = today.getFullYear();
    
    return `${dd}.${mm}.${yyyy}`;
}

function getTimeStr() {
    let now = new Date(),
        hh = now.getHours(),
        mm = now.getMinutes();

    return `${hh}:${mm}`;
}

const doctor1 = new Doctor('Milan', 'Jovanovic', 'kardiolog');
console.log(doctor1);

const patient1 = new Patient('Dragan', 'Ivanovic', 3096997764805, 35667, doctor1);
console.log(patient1);