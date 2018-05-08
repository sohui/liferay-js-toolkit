import PluginLogger from 'liferay-npm-build-tools-common/lib/plugin-logger';
import plugin from '../index';

it('injects imports', () => {
	const pkgJson = {
		name: 'package',
		version: '2.0.0',
		dependencies: {
			'pkg-a': '^1.0.0',
			'pkg-b': '^2.0.0',
			'pkg-c': '^3.0.0',
		},
	};

	plugin(
		{
			rootPkgJson: {
				name: 'root',
				version: '1.0.0',
			},
			globalConfig: {
				imports: {
					'provider': {
						'pkg-a': '^1.0.0',
						'pkg-b': '^2.0.0',
					},
					'': {
						'pkg-c': '^3.0.0',
					},
				},
			},
			config: {},
			log: new PluginLogger(),
		},
		{pkgJson}
	);

	expect(pkgJson).toMatchSnapshot();
});

it('injects imports even when not present in package.json', () => {
	const pkgJson = {
		name: 'package',
		version: '2.0.0',
	};

	plugin(
		{
			rootPkgJson: {
				name: 'root',
				version: '1.0.0',
			},
			globalConfig: {
				imports: {
					provider: {
						'pkg-a': '^1.0.0',
					},
				},
			},
			config: {},
			log: new PluginLogger(),
		},
		{pkgJson}
	);

	expect(pkgJson).toMatchSnapshot();
});