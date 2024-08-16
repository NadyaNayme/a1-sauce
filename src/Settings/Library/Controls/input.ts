import { createFlexContainer } from "a1-sauce/Settings/Components/Builders/container";
import { createInput, createLabel } from "a1-sauce/Settings/Components/Builders/input";

export const createTextSetting = (
	name: string,
	description: string,
	defaultValue: string
): HTMLElement => {
	const input = createInput('text', name, defaultValue);
	const label = createLabel(name, description);
	label.setAttribute('for', name);
	const container = createFlexContainer();
	container.appendChild(input);
	container.appendChild(label);
	return container;
}
