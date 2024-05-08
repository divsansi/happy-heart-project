import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';

export const app = initializeApp({
	apiKey: 'AIzaSyDOPwqqMYwDeskIX-tJEn9JavBNonFnJYA',
	authDomain: 'finalproject-28368.firebaseapp.com',
	projectId: 'finalproject-28368',
	storageBucket: 'finalproject-28368.appspot.com',
	messagingSenderId: '269091379492',
	appId: '1:269091379492:web:975fc047207f227511fbb1',
	measurementId: 'G-CPTZ9B1BEK'
});

// get city of user by UID
export const getCity = async (UID: string) => {
	const db = getFirestore(app);
	const docRef = doc(db, 'city', UID);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		const data = docSnap.data();
		if (data) {
			return data.nearestCity;
		}
	}
	return '';
};

// accept prescription
export const acceptPrescription = async (
	prescriptionID: string,
	patientID: string,
	pharmacyID: string
) => {
	const db = getFirestore(app);
	const docRef = doc(db, 'prescriptions', patientID, 'written', prescriptionID);
	await updateDoc(docRef, { accepted: true, accepted_by: pharmacyID });
};

// add pharmacy name and city to database
export const addPharmacyDetails = async (UID: string, name: string, city: string) => {
	const db = getFirestore(app);
	const docRef = doc(db, 'pharmacies', UID);
	await setDoc(docRef, { name, city });
};

// get pharmacy details
export const getPharmacyDetails = async (UID: string) => {
	const db = getFirestore(app);
	const docRef = doc(db, 'pharmacies', UID);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		const data = docSnap.data();
		if (data) {
			return data;
		}
	}
	return {};
};
