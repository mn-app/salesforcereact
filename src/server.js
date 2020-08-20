import LCC from 'lightning-container';

console.log('LCC', LCC);
export const inSalesforce = !!LCC.getRESTAPISessionKey();

export function serverFetch(url) {
	if (inSalesforce) {
		return fetchByApex(url);
	}
	return fetchByWeb(url);
}

function apexPromise(apexName, apexParams, config = { escape: true }) {
	return new Promise((resolve, reject) => {
		LCC.callApex(apexName, apexParams, (result) => resolve(result), config);
	});
}
function fetchByApex(url) {
	return apexPromise('ApexFetch.ff', url).then((result) => result.replace(/&quot;/g, '"'));
}

function fetchByWeb(url) {
	return fetch(url)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
		})
		.then((json) => JSON.stringify(json));
}
