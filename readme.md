# leaderlines

> Find nice positions for leader lines with two right angles

Given the start and end y-coordinates of leader lines, this module calculates
the positions of all the points on the lines, to give a result similar to the
grey leader lines on
[Our World in Data's charts](https://ourwaorldindata.org/owid-grapher).

## Install

```
$ npm install leaderlines
```

## Usage

```js
import leaderlines from 'leaderlines';

const data = [
    {y1: 10, y2: 3},
    {y1: 15, y2: 5},
    {y1: 20, y2: 20},
    {y1: 25, y2: 28},
    {y1: 26, y2: 35},
    {y1: 50, y2: 52}
];
const config = {xRange: [10, 30], middleX2: 24, targetGap: 3, maxSumOfGaps: 7};
leaderlines(data, config, d => d.y1, d => d.y2);
```

## API

### leaderlines(data, config, y1Fn, y2Fn)

#### data

Type: `array`

An array of objects, one per label.

#### config

Type: `object`

Members:

- `xRange`: a two-element array with the min and max x values for leader lines
- `middleX2`: the average x value for the vertical section of leader lines
- `targetGap`: the target x-distance between vertical sections of successive leader lines
- `maxSumOfGaps`: the maximum sum of these x-distances for a run of leader lines

#### y1Fn

Type: `function`

A function that takes an element of data and returns the first y value
(the y position of rightmost point of a line on the line chart)

#### y2Fn

Type: `function`

A function that takes an element of data and returns the first y value
(the y position of a label)

#### Return value

An array of objects, one for each leader line.  Each object has members `x1`,
`x2`, `x3`, `y1`, and `y2`.

Each leader line should be drawn with three line segments:
- (x1, y1) to (x2, y1)
- (x2, y1) to (x2, y2)
- (x2, y2) to (x3, y2)
