import * as mime from "mime/lite";
import colorRgba from "color-rgba";
import { Color } from "@cushiontreemap/core";
import COLOR from 'color';
import randomColor from 'randomcolor';

const COLORS = randomColor({
  count: 100,
  //hue: 'green'
});

const cyrb53 = function(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
  h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1>>>0);
};

export function getColorByName1(name: string): Color {
  const mm: string = mime.getType("" + name);
  const color = COLORS[cyrb53(""+mm) % COLORS.length];
  const c = colorRgba(color);
  return c;
}

export function getColorByName(name: string, rotate=0): Color {
  const mm: string = mime.getType("" + name);
  return getColorByType(mm, rotate);
}

export function getColorByType(mm: string, rotate=0): Color {

  const colorsOld = {
    blue: "#1482C8",
    darkBlue: "#1C387A",
    orange: "#EC8F08",
    purple: "#5E43C6",
    red: "#D83433",
    green: "#47B188",
    darkGreen: "#0C6845",
    brown: "#A19382",
    pink: "#FF4290",
  };

  var colors = {
    aqua:    '#7fdbff',
    blue:    '#0074d9',
    lime:    '#01ff70',
    navy:    '#001f3f',
    teal:    '#39cccc',
    olive:   '#3d9970',
    green:   '#2ecc40',
    red:     '#ff4136',
    maroon:  '#85144b',
    orange:  '#ff851b',
    purple:  '#b10dc9',
    yellow:  '#ffdc00',
    fuchsia: '#f012be',
    gray:    '#aaaaaa',
    white:   '#ffffff',
    black:   '#111111',
    silver:  '#dddddd'
  };

  let color = colors.red;
  if (mm) {
    if (mm.startsWith("image")) {
      color = colors.blue;
    } else if (mm.startsWith("video")) {
      color = colors.lime;
    } else if (mm.startsWith("application")) {
      color = colors.green;
    } else if (mm.startsWith("text")) {
      color = colors.fuchsia;
    } else if (mm.startsWith("audio")) {
      color = colors.purple;
    }
  }
  if (rotate) {
    color = COLOR(color).rotate(rotate).rgb().string();
  }

  const c = colorRgba(color);
  return c;
}
