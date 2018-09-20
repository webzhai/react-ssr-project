const path = require('path');
const fs = require('fs')

module.exports = function isString(value) {
  return typeof value === 'string';
}

module.exports = function isObject(value) {
  return typeof value === 'object';
}

module.exports = function normalizePath(filepath, baseDir) {
  return path.isAbsolute(filepath) ? filepath : path.join(baseDir, filepath);
}

module.exports = function isTrue(value) {
  return value !== 'false' && (!!value || value === undefined);
}

function isMatch(regexArray, strMatch) {
  if (!regexArray) {
    return false;
  }
  // eslint-disable-next-line no-param-reassign
  regexArray = Array.isArray(regexArray) ? regexArray : [regexArray];
  return regexArray.some(item => new RegExp(item, '').test(strMatch));
}

function walkFile(dirs, excludeRegex, extMatch = '.js') {
  const entries = {};
  let entryDir = '';

  const walk = (dir, exclude) => {
    const dirList = fs.readdirSync(dir);
    dirList.forEach((item) => {
      const filePath = path.posix.join(dir, item);
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath, exclude);
    } else if (filePath.endsWith(extMatch) && !isMatch(exclude, filePath)) {
      const entryName = filePath.replace(entryDir, '').replace(/^\//, '').replace(extMatch, '');
      entries[entryName] = filePath;
    }
  });
  };

  // eslint-disable-next-line no-param-reassign
  dirs = Array.isArray(dirs) ? dirs : [dirs];
  dirs.forEach((dir) => {
    if (fs.existsSync(dir)) {
    entryDir = dir;
    walk(dir, excludeRegex);
  }
});

  return entries;
}

module.exports = function getEntry(configEntry = {}, baseDir, browsers) {
  const entries = {};
  let entryArray = [];
  const extMatch = '.jsx';

  if (configEntry.include) {
    entryArray = Array.isArray(configEntry.include) ? configEntry.include : [configEntry.include];
  } else {
    entryArray.push(configEntry);
  }

  entryArray.forEach((entry) => {
    if (isString(entry)) {
    const [entryPath, queryStr] = entry.split('?');
    const filepath = normalizePath(entryPath, baseDir);

    if (fs.statSync(filepath).isDirectory()) {
      const dirEntry = walkFile(filepath, configEntry.exclude, extMatch, baseDir);
      Object.keys(dirEntry).forEach((entryName) => {
        entries[entryName] = queryStr
          ? `${dirEntry[entryName]}?${queryStr}` : dirEntry[entryName];
    });
    } else {
      const entryName = path.basename(filepath, path.extname(filepath));
      entries[entryName] = queryStr ? `${filepath}?${queryStr}` : filepath;
    }
  } else if (isObject(entry)) {
    Object.keys(entry).forEach((entryName) => {
      const [entryPath, queryStr] = entry[entryName].split('?');
    const filepath = normalizePath(entryPath, baseDir);
    entries[entryName] = queryStr ? `${filepath}?${queryStr}` : filepath;
  });
  }
});
  return entries;
}
