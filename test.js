import test from 'ava';
import leaderlines from './index.js';

test('title', t => {
	const data = [
		{y1: 10, y2: 3},
		{y1: 15, y2: 5},
		{y1: 20, y2: 20},
		{y1: 25, y2: 28},
		{y1: 26, y2: 35},
		{y1: 50, y2: 52}
	];

	const expected = [
		{
			x1: 10,
			x2: 22.5,
			x3: 30,
			y1: 10,
			y2: 3
		},
		{
			x1: 10,
			x2: 25.5,
			x3: 30,
			y1: 15,
			y2: 5
		},
		{
			x1: 10,
			x2: 24,
			x3: 30,
			y1: 20,
			y2: 20
		},
		{
			x1: 10,
			x2: 25.5,
			x3: 30,
			y1: 25,
			y2: 28
		},
		{
			x1: 10,
			x2: 22.5,
			x3: 30,
			y1: 26,
			y2: 35
		},
		{
			x1: 10,
			x2: 24,
			x3: 30,
			y1: 50,
			y2: 52
		}
	];
	const config = {xRange: [10, 30], middleX2: 24, targetGap: 3, maxSumOfGaps: 7};
	t.deepEqual(leaderlines(data, config, d => d.y1, d => d.y2), expected);
});
