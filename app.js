
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

    examinePatient(patient) {
        // Remove appointment for both
        let appointment = this.appointments.shift();
        patient.appointments.shift();

        // Simulate examination
        if (appointment.type === 'BSExamination') {
            this.performBSExamination(patient);
        } else if (appointment.type === 'BPExamination') {
            this.performBPExamination(patient);
        } else {
            console.error('Unknown examination type');
        }

        // Log event
        logEvent(getTimeDateStr(), `Pacijent ${patient.firstName} pregledan`);
    }

    performBSExamination(patient) {
        let bloodSugar = Math.floor(Math.random() * (10 - 1) + 1);
        let patientName = `${patient.firstName} ${patient.lastName}`;
        console.log('Rezultati pregleda šećera u krvi:');
        console.log(`Ime pacijenta: ${patientName}`);
        console.log(`Nivo šećera: ${bloodSugar}`);
    }

    performBPExamination(patient) {
        let bloodPressure = Math.floor(Math.random() * (100 - 1) + 1);
        let patientName = `${patient.firstName} ${patient.lastName}`;
        console.log('Rezultati krvnog pritiska:');
        console.log(`Ime pacijenta ${patientName}`);
        console.log(`Krvni pritisak: ${bloodPressure}`);
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
    constructor(date, time, type) {
        this.date = date;
        this.time = time;
        this.type = type;
        logEvent(getTimeDateStr(), `Zakazan pregled za ${this.date}`);
    }
}

// Date functions
function getTimeStr() {
    let now = new Date(),
        hh = now.getHours(),
        mm = now.getMinutes();

    return `${hh}:${mm}`;
}

function getDateStr(isAppointment) {
    var today = new Date(),
        dd = today.getDate(),
        mm = today.getMonth(),
        yyyy = today.getFullYear();

    if (isAppointment) {
        mm += 1;
    }
    
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
    getDateStr(true),
    getTimeStr(),
    'BSExamination',
    patient1
);

/* Doktor Milan zakazuje pregled za merenje krvnog pritiska 
za pacijenta Dragan */
doctor1.setAppointment(
    getDateStr(true),
    getTimeStr(),
    'BPExamination',
    patient1
)

/* Pacijent Dragan obavlja laboratorijski pregled za merenje 
nivoa šećera u krvi */
doctor1.examinePatient(patient1);

/* Pacijent Dragan obavlja laboratorijski pregled za merenje 
krvnog pritiska */
doctor1.examinePatient(patient1);

console.log(doctor1);
console.log(patient1);