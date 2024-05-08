<script lang="ts">
	import { app } from '$lib/firebase';
	import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
	import { getFirestore } from 'firebase/firestore';
	import { FirebaseApp, SignedIn, SignedOut } from 'sveltefire';
	import '../app.pcss';

	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { Alert, Button, Input, Label } from 'flowbite-svelte';
	import { Register, Section } from 'flowbite-svelte-blocks';

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
</script>

<FirebaseApp {auth} {firestore}>
	<SignedIn>
		<div class="min-h-screen w-full bg-[url('/app-bg.jpeg')] bg-cover bg-fixed">
			<slot />
		</div>

		<BottomNav position="fixed" classInner="grid-cols-3">
			<SignedIn let:signOut>
				<BottomNavItem btnName="Home" href="/">
					<HomeSolid
						class="group-hover:text-primary-600 dark:group-hover:text-primary-500 mb-1 h-5 w-5 text-gray-400"
					/>
				</BottomNavItem>
				<BottomNavItem btnName="Speeches" href="/speeches">
					<WalletSolid
						class="group-hover:text-primary-600 dark:group-hover:text-primary-500 mb-1 h-5 w-5 text-gray-400"
					/>
				</BottomNavItem>
				<!-- <BottomNavItem btnName="Speeches" href="/speeches">
				<LandmarkSolid
					class="mb-1 h-5 w-5 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
				/>
			</BottomNavItem> -->

				<!-- <BottomNavItem btnName="Profile" href="/profile">
					<UserCircleSolid
						class="group-hover:text-primary-600 dark:group-hover:text-primary-500 mb-1 h-5 w-5 text-gray-400"
					/>
				</BottomNavItem> -->
				<BottomNavItem btnName="Log Out" on:click={signOut}>
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
				<div class="min-w-screen flex min-h-screen flex-col items-center justify-center">
					<div class="mx-4 w-full max-w-2xl">
						<Section name="login">
							<Register href="/">
								<svelte:fragment slot="top">
									<!-- <img class="mr-2 h-8 w-8" src="/images/logo.svg" alt="logo" /> -->
									<img
										class="mr-2 h-32 w-32"
										src="https://i.postimg.cc/Gm7yDmVc/logo-white.png"
										alt="logo"
									/>
									<!-- Happy Heart -->
								</svelte:fragment>
								<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
									<form
										on:submit={(e) => {
											e.preventDefault();
											phraseData(auth);
										}}
										class="flex flex-col space-y-6"
										action="/"
									>
										<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-gray-400">Log In</h3>
										{#if error.status}
											<Alert color="red">
												<span class="font-medium">{error.title}</span>
												{error.message}
											</Alert>
										{/if}
										<Label class="space-y-2">
											<span>Your email</span>
											<Input
												type="email"
												name="email"
												bind:value={userData.email}
												placeholder="name@company.com"
												required
											/>
										</Label>
										<Label class="space-y-2">
											<span>Your password</span>
											<Input
												type="password"
												name="password"
												bind:value={userData.password}
												placeholder="•••••"
												required
											/>
										</Label>
										<div class="flex items-start">
											<!-- <Checkbox>Remember me</Checkbox> -->
											<a
												href="/"
												class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
												>Forgot password?</a
											>
										</div>
										<Button type="submit" class="w-full1">Sign in</Button>
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<p class="text-sm font-light text-gray-400">
											<!-- svelte-ignore a11y-click-events-have-key-events -->
											<!-- svelte-ignore a11y-no-static-element-interactions -->
											<!-- svelte-ignore a11y-missing-attribute -->
											Don’t have an account yet?
											<a
												on:click={() => {
													login = false;
												}}
												class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
												>Sign up</a
											>
										</p>
									</form>
								</div>
							</Register>
						</Section>
					</div>
				</div>
			</SignedOut>
		{:else}
			<SignedOut let:auth>
				<div class="min-w-screen flex min-h-screen flex-col items-center justify-center">
					<div class="mx-4 w-full max-w-2xl">
						<Section name="login">
							<Register href="/">
								<svelte:fragment slot="top">
									<!-- <img class="mr-2 h-8 w-8" src="/images/logo.svg" alt="logo" /> -->
									Happy Heart
								</svelte:fragment>
								<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
									<form
										on:submit={(e) => {
											e.preventDefault();
											phraseData2(auth);
										}}
										class="flex flex-col space-y-6"
										action="/"
									>
										<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-gray-400">
											Sign Up
										</h3>
										{#if error.status}
											<Alert color="red">
												<span class="font-medium">{error2.title}</span>
												{error2.message}
											</Alert>
										{/if}
										<Label class="space-y-2">
											<span>Your Full Name</span>
											<Input
												type="text"
												name="name"
												placeholder="Jhon Smith"
												bind:value={userData2.displayName}
												required
											/>
										</Label>
										<Label class="space-y-2">
											<span>Your email</span>
											<Input
												type="email"
												name="email"
												placeholder="name@company.com"
												bind:value={userData2.email}
												required
											/>
										</Label>
										<Label class="space-y-2">
											<span>Your password</span>
											<Input
												type="password"
												name="password"
												bind:value={userData2.password}
												placeholder="•••••"
												required
											/>
										</Label>
										<Label class="space-y-2">
											<span>Confirm password</span>
											<Input
												type="password"
												name="cpassword"
												bind:value={userData2.cpassword}
												placeholder="•••••"
												required
											/>
										</Label>
										<Button type="submit" class="w-full1">Sign Up</Button>
										<p class="text-sm font-light text-gray-400">
											<!-- svelte-ignore a11y-no-static-element-interactions -->
											<!-- svelte-ignore a11y-missing-attribute -->
											<!-- svelte-ignore a11y-click-events-have-key-events -->
											Already have an account yet?
											<a
												on:click={() => {
													login = true;
												}}
												class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
												>Log in</a
											>
										</p>
									</form>
								</div>
							</Register>
						</Section>
					</div>
				</div>
			</SignedOut>
		{/if}
	</SignedOut>
</FirebaseApp>
