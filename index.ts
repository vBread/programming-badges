import { writeFileSync } from 'fs';
import { stringify } from 'querystring';
import { get } from 'simple-icons';
import * as data from './badges.json';

const url = 'https://img.shields.io/badge';
const [badges, refs]: [string[], string[]] = [[], []];

for (const badge of data) {
	const icon = get(badge.name);
	if (!icon) continue;

	const badgeURL = `${url}/${icon.title.split(' ').join('_')}-${badge.backgroundColor ?? icon.hex}?`;
	const query = stringify({
		style: 'for-the-badge',
		labelColor: badge.labelColor ?? icon.hex,
		logoColor: badge.logoColor ?? icon.hex,
		logo: icon.slug
	});

	refs.push(`[${icon.title}]: ${badgeURL + query}`);
	badges.push(`[![${icon.title}]](${badge.link} "${icon.title}")`);
}

writeFileSync('README.md', `${['# Programming Badges', badges.join('  \n'), refs.join('\n')].join('\n\n')}\n`);
