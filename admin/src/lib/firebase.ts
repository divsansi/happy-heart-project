import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, serverTimestamp, getDocs } from 'firebase/firestore';

export const app = initializeApp({
	apiKey: 'AIzaSyDOPwqqMYwDeskIX-tJEn9JavBNonFnJYA',
	authDomain: 'finalproject-28368.firebaseapp.com',
	projectId: 'finalproject-28368',
	storageBucket: 'finalproject-28368.appspot.com',
	messagingSenderId: '269091379492',
	appId: '1:269091379492:web:975fc047207f227511fbb1',
	measurementId: 'G-CPTZ9B1BEK'
});

export const addSpeech = async (title: string, link: string, description: string) => {
	const db = getFirestore(app);
	addDoc(collection(db, 'speeches'), {
		title: title,
		link: link,
		description: description,
		created: serverTimestamp()
	});
};

export interface Speech {
	title: string;
	link: string;
	description: string;
	created: string;
}

export const getSpeeches = async () => {
	const db = getFirestore(app);
	const querySnapshot = await getDocs(collection(db, 'speeches'));
	const speeches: Speech[] = [];
	// biome-ignore lint/complexity/noForEach: <explanation>
	querySnapshot.forEach((doc) => {
		speeches.push(doc.data() as Speech);
	});
	return speeches;
};
