// stores/account.js
import { defineStore } from 'pinia'
import { reactive } from 'vue'
export const useAccountStore = defineStore('account', {
	state: () => {
		const items = reactive([
			{
				id: 1,
				mark: '',
				type: 'Локальная',
				login: 'John',
				password: 'werwe',
				button: ''
			},
			{
				id: 2,
				mark: '',
				type: 'Локальная',
				login: 'Bill',
				password: 'asdasd',
				button: ''
			},
			{
				id: 3,
				mark: '',
				type: 'Локальная',
				login: 'Kate',
				password: 'zxcxz',
				button: ''
			},
			{
				id: 4,
				mark: '',
				type: 'LDAP',
				login: 'Alice',
				password: '',
				button: ''
			},
			{
				id: 5,
				mark: '',
				type: 'LDAP',
				login: 'Feel',
				password: '',
				button: ''
			}
		])
		return { items }
	},
	actions: {
		removeItem(id) {
			this.items = this.items.filter((item) => item.id !== id)
			this.save()
		},
		addItem() {
			this.items.push({
				id: this.items.length + 1,
				type: 'Локальная',
				login: '',
				password: '',
				button: ''
			})
		},
		save() {
			const accounts = JSON.parse(JSON.stringify(this.items))
			accounts.forEach((account) => {
				if (account.mark) {
					account.mark = account.mark.split(';')
				}
			})
			localStorage.setItem('accounts', JSON.stringify(accounts))
		},
		parse() {
			const accounts = JSON.parse(localStorage.getItem('accounts'))
			if (accounts) {
				accounts.forEach((account) => {
					if (account.mark) account.mark = account.mark.join(';')
				})
			}
			this.items = accounts || []
		}
	}
})
