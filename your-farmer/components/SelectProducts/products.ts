export const milkOptions = [
	{
		value: 'cowMilk',
		label: 'Коровье молоко',
		amount: 'л',
		class: 'milkProduct'
	},
	{
		value: 'goatMilk',
		label: 'Козье молоко',
		amount: 'л',
		class: 'milkProduct'
	},
	{
		value: 'curd',
		label: 'Творог',
		amount: 'кг',
		class: 'milkProduct'
	},
	{
		value: 'sourСream',
		label: 'Сметана',
		amount: 'кг',
		class: 'milkProduct'
	},
	{
		value: 'cheese',
		label: 'Сыр',
		amount: 'кг',
		class: 'milkProduct'
	},
	{
		value: 'kefir',
		label: 'Кефир',
		amount: 'л',
		class: 'milkProduct'
	}
]

export const meatOptions = [
	{
		value: 'курица',
		label: 'Курица',
		amount: 'кг',
		class: 'meatProduct'
	},
	{
		value: 'говядина',
		label: 'Говядина',
		amount: 'кг',
		class: 'meatProduct'
	},
	{
		value: 'свинина',
		label: 'Свинина',
		amount: 'кг',
		class: 'meatProduct'
	}
]

export const groupedOptions = [
	{
		label: 'Молочная продукция',
		options: milkOptions
	},
	{
		label: 'Мясо',
		options: meatOptions
	}
]
