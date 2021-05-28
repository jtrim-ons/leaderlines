function getSteppedLinePositions(data, config, y1Fn, y2Fn) {
	const leaderLines = data
		.map(d => ({
			x1: config.xRange[0],
			x3: config.xRange[1],
			y1: y1Fn(d),
			y2: y2Fn(d)
		}))
		.sort((a, b) => {
			return a.y2 - b.y2;
		});
	for (let i = 0; i < leaderLines.length;) {
		const end = findEndOfRun(leaderLines, i);
		const run = leaderLines.slice(i, end);
		const last = leaderLines[end - 1];
		if (last.y1 < last.y2) {
			run.reverse();
		}

		setX2Positions(run, config);
		i = end;
	}

	return leaderLines;
}

function findEndOfRun(leaderLines, i) {
	const sl = leaderLines[i];
	if (sl.y1 === sl.y2) {
		return i + 1;
	}

	let previousMaxY = Math.max(sl.y1, sl.y2);
	while (++i < leaderLines.length) {
		const sl_ = leaderLines[i];
		if (sl_.y1 === sl_.y2 ||
			(sl.y1 < sl.y2) !== (sl_.y1 < sl_.y2) ||
				Math.min(sl_.y1, sl_.y2) > previousMaxY + 2) {
			return i;
		}

		previousMaxY = Math.max(sl_.y1, sl_.y2);
	}

	return i;
}

function setX2Positions(run, config) {
	if (run.length === 1) {
		run[0].x2 = config.middleX2;
		return;
	}

	const totalWidth = Math.min((run.length - 1) * config.targetGap, config.maxSumOfGaps);
	const gap = totalWidth / (run.length - 1);
	let position = config.middleX2 - (totalWidth / 2);
	for (const sl of run) {
		sl.x2 = position;
		position += gap;
	}
}

export default getSteppedLinePositions;
