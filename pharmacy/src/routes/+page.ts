import { collectionGroup, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app, getCity } from '$lib/firebase';

export const load = async () => {
	const firestore = getFirestore(app);
	const prescription_collection = query(
		collectionGroup(firestore, 'written'),
		where('accepted', '==', false)
	);

	const prescriptions = await getDocs(prescription_collection);

	const data = prescriptions.docs.map((doc) => {
		const data = doc.data();
		data.id = doc.id;
		return data;
	});

	// get city of user by UID and map to data
	await data.map(async (prescription) => {
		prescription.city = await getCity(prescription.uid);
	});

	return {
		data
	};
};
