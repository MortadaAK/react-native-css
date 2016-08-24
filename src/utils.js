import fs from 'fs';

export default class Utils {

  static arrayContains(value, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (value === arr[i]) {
        return true
      }
    }
    return false;
  }

  static clean(string) {
    return string.replace(/\r?\n|\r/g, "");
  }

  static readFile(file, cb) {
    fs.readFile(file, "utf8", cb);
  }

  static outputReactFriendlyStyle(style, outputFile, prettyPrint, literalObject) {
    var indentation = prettyPrint ? 4 : 0;
    var jsonOutput = JSON.stringify(style, null, indentation);
    var output = "";
    output += (literalObject) ? `${jsonOutput}` : `
    import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
    const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

    export default StyleSheet.create(${jsonOutput});`;
    // Write to file
    fs.writeFileSync(outputFile, output);
    return output;
  }

  static contains(string, needle) {
    var search = string.match(needle);
    return search && search.length > 0;
  }
}
