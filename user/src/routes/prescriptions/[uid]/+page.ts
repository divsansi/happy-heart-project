import { getPharmacyDetails, getPrescriptions } from '$lib/firebase';
import type { PageServerLoad } from '../../gethelp/chat/[id]/$types';

export const load: PageServerLoad = async ({ params }) => {
	const uid = params.uid;

	const presData = await getPrescriptions(uid);

	// get pharmacy details
	for (const prescription of presData) {
		prescription.pharmacy = await getPharmacyDetails(prescription.accepted_by);
	}

	console.log(presData);
	return {
		presData
	};
};
