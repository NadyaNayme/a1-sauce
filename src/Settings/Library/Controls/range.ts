import { createFlexContainer, createOutput } from "a1-sauce/Settings/Components/Builders/container";
import { createInput, createLabel } from "a1-sauce/Settings/Components/Builders/input";
import { getSetting } from "a1-sauce/Settings/Storage";

export const createRangeSetting = (
	name: string,
	description: string,
	options: {
		classes?: Array<string>;
		defaultValue?: string;
		min?: number;
		max?: number;
		unit?: string;
	} = {}
): HTMLElement => {
	const {
		classes = options.classes ?? '',
		defaultValue = options.defaultValue ?? '100',
		min = options.min ?? 0,
		max = options.max ?? 100,
		unit = options.unit ?? '%',
	} = options;
	const input = createInput('range', name, defaultValue);
	input.setAttribute('min', min.toString());
	input.setAttribute('max', max.toString());
	const label = createLabel(name, description);
	label.classList.add('full');
	if (getSetting(name) != undefined) {
		input.value = getSetting(name);
	}
	const output = createOutput();
	output.setAttribute('id', `${name}Output`);
	output.setAttribute('for', name);
	output.innerHTML = input.value + unit;
	output.after(unit);
	const container = createFlexContainer();
	if (classes.length) {
		for (let i = classes.length; i--; i >= 0) {
			container.classList.add(classes[i]);
		}
	}
	container.classList.add('flex-wrap');
	container.appendChild(label);
	container.appendChild(input);
	container.appendChild(output);
	input.addEventListener('input', () => {
		output.innerHTML = input.value + unit;
	});
	return container;
}
