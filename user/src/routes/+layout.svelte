<script lang="ts">
	import { app } from '$lib/firebase';
	import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
	import { getFirestore } from 'firebase/firestore';
	import { FirebaseApp, SignedIn, SignedOut } from 'sveltefire';
	import '../app.pcss';

	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { Alert, Button, Input, Label } from 'flowbite-svelte';
	import { Register, Section } from 'flowbite-svelte-blocks';
	import { onMount } from 'svelte';
	import { motivationalNotification } from '$lib/motivationalnotification';

	import { BottomNav, BottomNavItem } from 'flowbite-svelte';
	import {
		ArrowLeftToBracketOutline,
		ArrowRightToBracketOutline,
		HomeSolid,
		LandmarkSolid,
		UserCircleSolid,
		UserEditSolid,
		WalletSolid
	} from 'flowbite-svelte-icons';

	let userData = {
		email: '',
		password: ''
	};

	let error = {
		status: false,
		message: '',
		title: ''
	};

	const phraseData = (auth: any) => {
		if (userData.password.length < 6) {
			error = {
				status: true,
				message: 'Password must be at least 6 characters long',
				title: 'Error!'
			};
		} else if (userData.email === '') {
			error = {
				status: true,
				message: 'Email is required',
				title: 'Error!'
			};
		} else if (userData.email.indexOf('@') === -1) {
			error = {
				status: true,
				message: 'Email is invalid',
				title: 'Error!'
			};
		} else {
			error = {
				status: false,
				message: '',
				title: ''
			};
		}

		try {
			signInWithEmailAndPassword(auth, userData.email, userData.password);
		} catch {
			error = {
				status: true,
				message:
					'An error occurred while creating your account. Please check whether you already have an account with this email address.',
				title: 'Error!'
			};
		}
	};

	let login = true;

	const firestore = getFirestore(app);
	const auth = getAuth(app);

	let userData2 = {
		email: '',
		password: '',
		cpassword: '',
		displayName: ''
	};

	let error2 = {
		status: false,
		message: '',
		title: ''
	};

	const phraseData2 = (auth: any) => {
		if (userData2.password !== userData2.cpassword) {
			error2 = {
				status: true,
				message: 'Passwords do not match',
				title: 'Error!'
			};
		} else if (userData2.password.length < 6) {
			error2 = {
				status: true,
				message: 'Password must be at least 6 characters long',
				title: 'Error!'
			};
		} else if (userData2.email === '') {
			error2 = {
				status: true,
				message: 'Email is required',
				title: 'Error!'
			};
		} else if (userData2.email.indexOf('@') === -1) {
			error2 = {
				status: true,
				message: 'Email is invalid',
				title: 'Error!'
			};
		} else if (userData2.displayName === '') {
			error2 = {
				status: true,
				message: 'Name is required',
				title: 'Error!'
			};
		} else {
			error2 = {
				status: false,
				message: '',
				title: ''
			};

			try {
				createUserWithEmailAndPassword(auth, userData2.email, userData2.password).then(
					(userCredential) => {
						const user = userCredential.user;

						// Capitalize the first letter of each word in the user's name
						userData2.displayName = userData2.displayName
							.toLowerCase()
							.split(' ')
							.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
							.join(' ');

						// Update the user's profile
						updateProfile(auth.currentUser, {
							displayName: userData2.displayName
						})
							.then(() => {
								// Profile updated!
								console.log('Profile updated!');
							})
							.catch((error) => {
								// An error occurred
								console.log(error);
							});
					}
				);
			} catch {
				error2 = {
					status: true,
					message:
						'An error occurred while creating your account. Please check whether you already have an account with this email address.',
					title: 'Error!'
				};
			}
		}
	};

	onMount(() => {
		motivationalNotification();
	});
</script>

<FirebaseApp {auth} {firestore}>
	<SignedIn>
		<slot />

		<BottomNav position="fixed" classInner="grid-cols-4">
			<SignedIn let:signOut>
				<BottomNavItem btnName="Home" href="/">
					<HomeSolid
						class="group-hover:text-primary-600 dark:group-hover:text-primary-500 mb-1 h-5 w-5 text-gray-400"
					/>
				</BottomNavItem>
				<BottomNavItem btnName="Journal" href="/journal">
					<WalletSolid
						class="group-hover:text-primary-600 dark:group-hover:text-primary-500 mb-1 h-5 w-5 text-gray-400"
					/>
				</BottomNavItem>
				<BottomNavItem btnName="Profile" href="/profile">
					<UserCircleSolid
						class="group-hover:text-primary-600 dark:group-hover:text-primary-500 mb-1 h-5 w-5 text-gray-400"
					/>
				</BottomNavItem>
				<BottomNavItem btnName="Logout" on:click={signOut}>
					<ArrowRightToBracketOutline
						class="group-hover:text-primary-600 dark:group-hover:text-primary-500 mb-1 h-5 w-5 text-gray-400"
					/>
				</BottomNavItem>
			</SignedIn>
			<SignedOut>
				<BottomNavItem btnName="Home" href="/">
					<HomeSolid
						class="group-hover:text-primary-600 dark:group-hover:text-primary-500 mb-1 h-5 w-5 text-gray-400"
					/>
				</BottomNavItem>
				<BottomNavItem btnName="Speeches" href="/speeches">
					<LandmarkSolid
						class="group-hover:text-primary-600 dark:group-hover:text-primary-500 mb-1 h-5 w-5 text-gray-400"
					/>
				</BottomNavItem>
				<BottomNavItem btnName="Log In" href="/login">
					<ArrowLeftToBracketOutline
						class="group-hover:text-primary-600 dark:group-hover:text-primary-500 mb-1 h-5 w-5 text-gray-400"
					/>
				</BottomNavItem>
				<BottomNavItem btnName="Sign Up" href="/signup">
					<UserEditSolid
						class="group-hover:text-primary-600 dark:group-hover:text-primary-500 mb-1 h-5 w-5 text-gray-400"
					/>
				</BottomNavItem>
			</SignedOut>
		</BottomNav>
	</SignedIn>
	<SignedOut>
		{#if login}
			<SignedOut let:auth>
				<section id="topBar" class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between; padding: 25px; margin-bottom: -20px; background: transparent; position: sticky; top: 0; backdrop-filter: blur(25px);">
					<img class="topbarLogo" src="https://i.postimg.cc/9Xwj56PC/logotext.png" alt="Logo">

					<script>
						window.addEventListener('scroll', () => {
							const topBar = document.getElementById('topBar');
							if (window.scrollY > 0) {
								topBar.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
								topBar.style.transition = 'box-shadow 0.5s';
							} else {
								topBar.style.boxShadow = 'none';
								topBar.style.transition = 'box-shadow 0.5s';
							}
						});
					</script>
				</section>

				<div class="flex flex-col" style="height: 100%; width: 100%; background: #ECECEC; margin-top: -55px; align-items: center; justify-content: center;">
					<div class="flex flex-col" style="width: 80%; gap: 20px;">
						<span class="flex flex-row" style="width: 100%; padding: 20px 0; align-items: center; justify-content: center; gap: 10px;">
							<img style="height: 34px; width: 34px;" src="https://i.postimg.cc/YCjBH9rS/favicon.png" alt="logo">
							<h1 style="font-size: 28px; font-family: 'Rubik', sans-serif;">Login</h1>
						</span>
						<form class="flex flex-col" style="width: 100%; gap: 20px;"
							on:submit={(e) => {
								e.preventDefault();
								phraseData(auth);
							}}
							action="/"
						>
							{#if error.status}
								<Alert color="red">
									<span class="font-medium">{error.title}</span>
									{error.message}
								</Alert>
							{/if}
							<span class="flex flex-col" style="width: 100%; gap: 10px;">
								<input
									style="border-radius: 10px; padding: 8px 10px;"
									type="email"
									name="email"
									bind:value={userData.email}
									placeholder="Email Address"
									required
								/>
								<input
									style="border-radius: 10px; padding: 8px 10px;"
									type="password"
									name="password"
									bind:value={userData.password}
									placeholder="Password"
									required
								/>
							</span>
							<button type="submit" class="flex flex-row" style="width: 100%; background: #1B72B5; color: #FFFFFF; text-transform: uppercase; padding: 10px; font-size: 12px; border: none; border-radius: 10px; align-items: center; justify-content: center; gap: 10px; cursor: pointer;">Login</button>
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<span class="flex flex-col" style="gap: 10px;">
								<p class="light" style="width: 100%; color: var(--blackGrey); text-transform: uppercase; font-size: 12px; text-align-last: center; padding-top: 20px;">
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<!-- svelte-ignore a11y-no-static-element-interactions -->
									<!-- svelte-ignore a11y-missing-attribute -->
									New User?
									<a
										on:click={() => {
											login = false;
										}}
										class="regular" style="color: var(--accent);"
										>Signup</a
									>
								</p>
							</span>
						</form>
					</div>
				</div>
			</SignedOut>
		{:else}
			<SignedOut let:auth>
				<section id="topBar" class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between; padding: 25px; margin-bottom: -20px; background: transparent; position: sticky; top: 0; backdrop-filter: blur(25px);">
					<img class="topbarLogo" src="https://i.postimg.cc/9Xwj56PC/logotext.png" alt="Logo">

					<script>
						window.addEventListener('scroll', () => {
							const topBar = document.getElementById('topBar');
							if (window.scrollY > 0) {
								topBar.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
								topBar.style.transition = 'box-shadow 0.5s';
							} else {
								topBar.style.boxShadow = 'none';
								topBar.style.transition = 'box-shadow 0.5s';
							}
						});
					</script>
				</section>

				<div class="flex flex-col" style="height: 100%; width: 100%; background: #ECECEC; margin-top: -55px; align-items: center; justify-content: center;">
					<div class="flex flex-col" style="width: 80%; gap: 20px;">
						<span class="flex flex-row" style="width: 100%; padding: 20px 0; align-items: center; justify-content: center; gap: 10px;">
							<img style="height: 34px; width: 34px;" src="https://i.postimg.cc/YCjBH9rS/favicon.png" alt="logo">
							<h1 style="font-size: 28px; font-family: 'Rubik', sans-serif;">Signup</h1>
						</span>
						<form class="flex flex-col" style="width: 100%; gap: 20px;"
							on:submit={(e) => {
								e.preventDefault();
								phraseData2(auth);
							}}
							action="/"
						>
							{#if error.status}
								<Alert color="red">
									<span class="font-medium">{error2.title}</span>
									{error2.message}
								</Alert>
							{/if}
							<span class="flex flex-col" style="width: 100%; gap: 10px;">
								<input
									style="border-radius: 10px; padding: 8px 10px;"
									type="text"
									name="name"
									placeholder="Full Name"
									bind:value={userData2.displayName}
									required
								/>
								<input
									style="border-radius: 10px; padding: 8px 10px;"
									type="email"
									name="email"
									placeholder="Email Address"
									bind:value={userData2.email}
									required
								/>
								<input
									style="border-radius: 10px; padding: 8px 10px;"
									type="password"
									name="password"
									bind:value={userData2.password}
									placeholder="Password"
									required
								/>
								<input
									style="border-radius: 10px; padding: 8px 10px;"
									type="password"
									name="cpassword"
									bind:value={userData2.cpassword}
									placeholder="Confirm Password"
									required
								/>
							</span>
							<button type="submit" class="flex flex-row" style="width: 100%; background: #1B72B5; color: #FFFFFF; text-transform: uppercase; padding: 10px; font-size: 12px; border: none; border-radius: 10px; align-items: center; justify-content: center; gap: 10px; cursor: pointer;">Signup</button>
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<span class="flex flex-col" style="gap: 10px;">
								<p class="light" style="width: 100%; color: var(--blackGrey); text-transform: uppercase; font-size: 12px; text-align-last: center; padding-top: 20px;">
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<!-- svelte-ignore a11y-no-static-element-interactions -->
									<!-- svelte-ignore a11y-missing-attribute -->
									Existing User?
									<a
										on:click={() => {
											login = true;
										}}
										class="regular" style="color: var(--accent);"
										>Login</a
									>
								</p>
							</span>
						</form>
					</div>
				</div>
			</SignedOut>
		{/if}
	</SignedOut>
</FirebaseApp>
