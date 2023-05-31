import { defineStore } from "pinia";
const baseUrl = `${import.meta.env.VITE_URL_AUTH_API}/users`;
export const useUsersStore = defineStore({
	id: "users",
	state: () => ({
		users: {},
	}),
	actions: {
		async getAll() {
			this.users = { loading: true };
			// fetchWrapper
			// 	.get(baseUrl)
			// 	.then((users) => (this.users = users))
			// 	.catch((error) => (this.users = { error }));
		},
	},
});
