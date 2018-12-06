
// Person class
class Person {
    constructor(fname, lname, appointments = []) {
        this.firstName = fname;
        this.lastName = lname;
        this.appointments = appointments;
    }
}

// Doctor class
class Doctor extends Person {
    constructor(fname, lname, specialty, patients = [], appointments) {
        super(fname, lname, appointments);
        this.specialty = specialty;
        this.patients = patients;
        logEvent(getTimeDateStr(), `Kreiran doktor ${this.firstName}`);
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

// Patient class
class Patient extends Person {
    constructor(fname, lname, jmbg, caseNum, doctor = null, appointments) {
        super(fname, lname, appointments);
        this.jmbg = jmbg;
        this.caseNumber = caseNum;
        this.chosenDoctor = doctor;
        logEvent(getTimeDateStr(), `Kreiran pacijent ${this.firstName}`);
    }

    setDoctor(doctor) {
        this.chosenDoctor = doctor;
    }

    addAppointment(appointment) {
        this.appointments.push(appointment);
    }
}

// Appointment class
class Appointment {
    constructor(type, date, time) {
        this.type = type;
        this.date = date;
        this.time = time;
        logEvent(getTimeDateStr(), 'Zakazan pregled');
    }
}

// Date functions
function getTimeStr() {
    let now = new Date(),
        hh = now.getHours(),
        mm = now.getMinutes();

    return `${hh}:${mm}`;
}

function getDateStr() {
    let today = new Date(),
        dd = today.getDate(),
        mm = today.getMonth(),
        yyyy = today.getFullYear();
    
    return `${dd}.${mm}.${yyyy}`;
}

function getTimeDateStr() {
    let time = getTimeStr(),
        date = getDateStr();
    
    return `${date} ${time}`;
}

function logEvent(dateTime, action) {
    // Log template:
    // [DD.MM.YYYY HH:mm] Action
    console.log(`[${dateTime}] ${action}`);
}

// Kreirati pacijenta i doktora
const doctor1 = new Doctor('Milan', 'Jovanovic', 'kardiolog');
const patient1 = new Patient('Dragan', 'Ivanovic', 3096997764805, 35667);

// Pacijent Dragan bira doktora Milana
patient1.doctor = doctor1;

/* Doktor Milan zakazuje pregled za merenje nivoa šećera
u krvi za pacijenta Dragan */
doctor1.setAppointment(
    getDateStr(),
    getTimeStr(),
    'BSExamination',
    patient1
);

/* Doktor Milan zakazuje pregled za merenje krvnog pritiska 
za pacijenta Dragan */
doctor1.setAppointment(
    getDateStr(),
    getTimeStr(),
    'BPExamination',
    patient1
)

/* Pacijent Dragan obavlja laboratorijski pregled za merenje 
nivoa šećera u krvi */

/* Pacijent Dragan obavlja laboratorijski pregled za merenje 
krvnog pritiska */

console.log(doctor1);
console.log(patient1);