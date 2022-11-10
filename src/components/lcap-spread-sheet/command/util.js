import GC from '@spread';

export default function registerCmd(workbook, key, fn, {
  canUndo,
  shortCut = []
} = {}) {
  if (canUndo === undefined) {
    canUndo = true;
  }
  let command = {
    canUndo,
    execute: function (context, options, isUndo) {
      let Commands = GC.Spread.Sheets.Commands;
      if (isUndo) {
        Commands.undoTransaction(context, options);
        return true;
      } else {
        Commands.startTransaction(context, options);
        fn(options);
        Commands.endTransaction(context, options);
        return true;
      }
    }
  };
  let commandManager = workbook.commandManager();
  commandManager.register(key, command);
  if (shortCut) {
    workbook.commandManager().setShortcutKey(
      key, shortCut[0], shortCut[1], shortCut[2], shortCut[3], shortCut[4]
    );
  }
}

export function getSubStrings(source, beginChar, endChar) {
  if (!source) {
    return [];
  }
  let subStrings = [], tempSubString = '', inSubString = false;
  for (let index = 0; index < source.length; index++) {
    if (!inSubString && source[index] === beginChar) {
      inSubString = true;
      tempSubString = source[index];
      continue;
    }
    if (inSubString) {
      tempSubString += source[index];
      if (source[index] === endChar) {
        subStrings.push(tempSubString);
        tempSubString = '';
        inSubString = false;
      }
    }
  }
  return subStrings;
}