import { test, expect, describe } from 'vitest';
import { getVersion } from '../serverCheck';


const versionUrl = 'https://raw.githubusercontent.com/NadyaNayme/job-gauges/master/dist/version.json';
const majorVersion = 100;
const minorVersion = 100;
const patchVersion = 100;


describe('Patches.serverCheck()', () => {
	test('Github semver is behind Current semver', async () => {
		let req = await getVersion(
			versionUrl
		);
		let res = JSON.parse(JSON.stringify(req));

		expect(res.version).toBeTypeOf('string');

		expect(parseInt(res.version.split('.')[0], 10)).toBeLessThanOrEqual(majorVersion)
		expect(parseInt(res.version.split('.')[1], 10)).toBeLessThanOrEqual(minorVersion);
		expect(parseInt(res.version.split('.')[2], 10)).toBeLessThanOrEqual(patchVersion);
	});

	test("Current semver does not equal Github semver", async () => {
		let req = await getVersion(versionUrl);
		let res = JSON.parse(JSON.stringify(req));

		expect(res.version).toBeTypeOf('string');

		expect(res.version).not.toEqual(
			`${majorVersion}.${minorVersion}.${patchVersion}`
		);
	});
});
