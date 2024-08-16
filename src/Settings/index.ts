import { DropdownOption } from './Components';
import * as Library from './Library/index';
import * as Storage from './Storage/index';

export enum SettingsType {
	Alarm = 'alarm',
	Button = 'button',
	Checkbox = 'checkbox',
	Dropdown = 'dropdown',
	Input = 'input',
	Number = 'number',
	Profile = 'profile',
	Range = 'range',
}

/*
 *
 * Settings Manager is your access point to localStorage and building your Settings UI.
 *
*/

export class SettingsManager {
	static #instance: SettingsManager;
	name: string = '';
	settings: HTMLElement[] | null = null;

	private constructor() {}

	public static get instance(): SettingsManager {
		if (!SettingsManager.#instance) {
			SettingsManager.#instance = new SettingsManager();
		}
		return SettingsManager.#instance;
	}

	public setName = (name: string): SettingsManager => {
		this.name = name;
		return this;
	};

	public getName = (): string => {
		return this.name;
	};

	public addAlarmSetting = (
		headerText: string,
		name: string,
		description: string,
		options?: {
			classes?: Array<string>;
			defaultvalue?: string;
			min?: number;
			max?: number;
			unit?: string;
		}
	): SettingsManager => {
		this.settings?.push(
			Library.createAlarmSetting(headerText, name, description, options)
		);
		return this;
	};

	public addButton = (
		content: string,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
		fn: Function,
		options: { classes: Array<string> }
	): SettingsManager => {
		this.settings?.push(Library.createButton(content, fn, options));
		return this;
	};

	public addCheckboxSetting = (
		name: string,
		description: string,
		defaultValue: unknown
	): SettingsManager => {
		this.settings?.push(
			Library.createCheckboxSetting(name, description, defaultValue)
		);
		return this;
	};

	public addDropdownSetting = (
		name: string,
		description: string,
		defaultValue: unknown,
		options: DropdownOption[]
	): SettingsManager => {
		this.settings?.push(
			Library.createDropdownSetting(
				name,
				description,
				defaultValue,
				options
			)
		);
		return this;
	};

	public addTextSetting = (
		name: string,
		description: string,
		defaultValue: string
	): SettingsManager => {
		this.settings?.push(
			Library.createTextSetting(name, description, defaultValue)
		);
		return this;
	};

	public addNumberSetting = (
		name: string,
		description: string,
		options: {
			defaultValue?: number;
			min?: number;
			max?: number;
		} = {}
	): SettingsManager => {
		this.settings?.push(
			Library.createNumberSetting(name, description, options)
		);
		return this;
	};

	public addRangeSetting = (
		name: string,
		description: string,
		options: {
			classes?: Array<string>;
			defaultValue?: string;
			min?: number;
			max?: number;
			unit?: string;
		} = {}
	): SettingsManager => {
		this.settings?.push(
			Library.createRangeSetting(name, description, options)
		);
		return this;
	};

	public getSettings = (): HTMLElement[] | null => {
		return this.settings;
	};

	public build = (): void => {
		const settings = this.getSettings();
		if (settings === null)
			throw new Error(
				'Settings are empty - please .add() settings before building'
			);
		const container = document.createElement('div');
		container.id = 'Settings';
		for (let i = 0; i < settings.length; i++) {
			container.appendChild(settings[i]);
		}
		document.append(container);
	};
}

export const Settings = SettingsManager.instance;
