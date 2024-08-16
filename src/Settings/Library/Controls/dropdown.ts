import { createFlexContainer } from "a1-sauce/Settings/Components/Builders/container";
import { createDropdown, createLabel, DropdownOption } from "a1-sauce/Settings/Components/Builders/input";

export const createDropdownSetting = (
	name: string,
	description: string,
	defaultValue: unknown,
	options: DropdownOption[]
): HTMLElement => {
	const select = createDropdown(name, defaultValue, options);
	const label = createLabel(name, description);
	const container = createFlexContainer(['reverse-setting']);
	container.appendChild(select);
	container.appendChild(label);
	return container;
}
