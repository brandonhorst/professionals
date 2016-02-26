import _ from 'lodash'

export function objectConstant(array) {
  return _.zipObject(array, array)
}

function doNotMergeArrayCustomizer(objValue, srcValue) {
  if (_.isArray(srcValue)) {
    return srcValue
  }
}

export function mergeObj(object, ...sources) {
  return _.mergeWith({}, object, ...sources, doNotMergeArrayCustomizer)
}

export function crowFliesDistance(fromCoords, toCoords) {
  return Math.abs(fromCoords[0] - toCoords[0]) + Math.abs(fromCoords[1] - toCoords[1])
}

export function linearDistance(fromCoords, toCoords) {
  if (fromCoords[0] === toCoords[0]) {
    return Math.abs(fromCoords[1] - toCoords[1])
  } else if (fromCoords[1] === toCoords[1]) {
    return Math.abs(fromCoords[0] - toCoords[0])
  } else {
    return -1
  }
}