<script setup lang="ts">
import { ElInput, ElSelect, ElButton } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { useAccountStore } from '../stores/account'

const account = useAccountStore()

account.parse()

const columns = [
	{ key: 'Метки', dataKey: 'mark', width: 250, component: ElInput, type: 'text', maxlength: 50 },
	{
		key: 'Тип записи',
		dataKey: 'type',
		width: 150,
		component: ElSelect,
		options: [
			{ label: 'LDAP', value: 'LDAP' },
			{ label: 'Локальная', value: 'Локальная' }
		],
		type: 'select'
	},
	{
		key: 'Логин',
		dataKey: 'login',
		width: 200,
		component: ElInput,
		type: 'text',
		maxlength: 100
	},
	{
		key: 'Пароль',
		dataKey: 'password',
		width: 200,
		showPassword: true,
		component: ElInput,
		type: 'password',
		maxlength: 100
	},
	{
		key: '',
		dataKey: 'remove',
		width: 300,
		type: 'button'
	}
]
</script>
<template>
	<div class="header">
		<h2>Учетные записи</h2>
		<button class="button-add" @click="account.addItem()">+</button>
	</div>
	<table>
		<thead>
			<tr>
				<th v-for="column in columns" :key="column.key" :style="{ width: column.width + 'px' }">
					{{ column.key }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(row, rowIndex) in account.$state.items" :key="rowIndex">
				<template v-for="column in columns" :key="column.key">
					<td v-if="row.type === 'Локальная' && column.dataKey === 'password'">
						<component
							:is="column.component"
							:type="column.type"
							:modelValue="row[column.dataKey]"
							@update:modelValue="(value) => (row[column.dataKey] = value)"
							:show-password="column.showPassword"
						>
						</component>
					</td>
					<td
						v-else-if="column.dataKey !== 'password'"
						:colspan="column.dataKey === 'login' && row.type === 'LDAP' ? 2 : 1"
					>
						<component
							v-if="column.type !== 'button'"
							:is="column.component"
							:type="column.type"
							:modelValue="row[column.dataKey]"
							@update:modelValue="(value) => (row[column.dataKey] = value)"
							@input="account.save()"
							:maxlength="column.maxlength"
							show-word-limit
							:class="{ 'input-error': !row[column.dataKey] }"
						>
							<el-option v-if="column.options" v-for="option in column.options" :value="option.value">{{
								option.label
							}}</el-option>
						</component>
						<el-button v-else :icon="Delete" :circle="true" @click="account.removeItem(row.id)"></el-button>
					</td>
				</template>
			</tr>
		</tbody>
	</table>
</template>

<style>
.button-add {
	margin-left: 20px;
}

td {
	border-radius: 5px;
	padding: 12px;
}
.el-button [class*='el-icon'] + span {
	margin-left: 0;
}
.header {
	display: flex;
	justify-content: start;
	gap: 16px;
	align-items: center;
}
.button-add {
	width: 32px;
	height: 32px;
	border-radius: 5px;
	border: 2px solid darkslategrey;
	font-size: 24px;
	line-height: 24px;
	text-align: center;
	padding: 0;
	background-color: lightgray;
	color: white;
	cursor: pointer;
}
.input-error {
	border: 1px solid lightcoral;
	padding: 2px;
	border-radius: 5px;
}
</style>
