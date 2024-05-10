export function motivationalNotification() {
	const notifications = document.cookie.split(';').find((cookie) => cookie.includes('notifications'));

	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const targetUrl = 'https://zenquotes.io/api/today';

	const lastNotificationTime = document.cookie
		.split('; ')
		.find(row => row.startsWith('lastNotificationTime='))
		?.split('=')[1];

	if (lastNotificationTime) {
		const timeSinceLastNotification = Date.now() - new Date(lastNotificationTime).getTime();
		if (timeSinceLastNotification < 24 * 60 * 60 * 1000) {
			// Less than 24 hours have passed since the last notification
			return;
		}
	}

	fetch(proxyUrl + targetUrl)
		.then(response => response.json())
		.then(data => {
			const quote = data[0].q;
			const author = data[0].a;

			const notiString = `${quote} - ${author}`;

			if (notifications && notifications.split('=')[1] === 'yes') {
				Notification.requestPermission().then((permission) => {
					if (permission === 'granted') {
						const notification = new Notification('QUOTE OF THE DAY', {
							body: notiString,
							icon: 'https://i.postimg.cc/T1b8Vb2p/logo.png'
						});

						// Set a cookie with the current time
						document.cookie = `lastNotificationTime=${new Date().toISOString()}; expires=${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
					}
				});
			} else if (notifications && notifications.split('=')[1] === 'no') {
				console.log('Notifications are disabled');
			}
		})
		.catch(error => console.error("Error fetching quote:", error));
}