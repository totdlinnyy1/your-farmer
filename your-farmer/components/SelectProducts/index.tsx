import { FC } from 'react'
import Select from 'react-select'
import { groupedOptions } from './/products'

interface Props {
	disabled: boolean
	onChange: any
	isMulti: boolean
	value: any
}

const SelectProduct: FC<Props> = ({ disabled, onChange, isMulti, value }) => {
	const groupStyles = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	}

	const formatGroupLabel = (data: any) => (
		<div style={groupStyles}>
			<span>{data.label}</span>
			<span
				style={{
					backgroundColor: '#EBECF0',
					borderRadius: '2em',
					color: '#172B4D',
					display: 'inline-block',
					fontSize: 12,
					fontWeight: 'normal',
					lineHeight: '1',
					minWidth: 1,
					padding: '0.16666666666667em 0.5em',
					textAlign: 'center'
				}}
			>
				{data.options.length}
			</span>
		</div>
	)

	return (
		<Select
			placeholder='Выберете продукт'
			isMulti={isMulti}
			isDisabled={disabled}
			options={groupedOptions}
			className='basic-multi-select'
			classNamePrefix='select'
			formatGroupLabel={formatGroupLabel}
			onChange={onChange}
			value={value}
			noOptionsMessage={() => 'Ничего не найдено'}
		/>
	)
}

export default SelectProduct
