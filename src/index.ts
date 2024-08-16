import { SettingsManager } from './Settings/index';

export class A1Sauce {
	static #instance: A1Sauce;
	Settings: SettingsManager = SettingsManager.instance;

	private constructor() {}

	public static get instance(): A1Sauce {
		if (!A1Sauce.#instance) {
			A1Sauce.#instance = new A1Sauce();
		}
		return A1Sauce.#instance;
	}

	public setName = (name: string): A1Sauce => {
		this.Settings.setName(name);
		return this;
	}

	public getName = (): string => {
		return this.Settings.getName();
	}
}
