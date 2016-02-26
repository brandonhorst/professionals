import _ from 'lodash'
// from http://ryanfunduk.com/articles/immutable-data-from-scratch/
// roughly implements the MongoDB update API for normal JS objects/arrays

export default function update(obj, updates) {
  const COMMANDS = ['$push', '$unshift', '$splice', '$merge', '$set', '$unset', '$apply']

  // prepare the new object
  // shallow copy suffices here due to each
  // nested object being handled recursively
  // (each will be shallow copied)
  const next = _.clone(obj)

  if (_.isObject(updates) && _.includes(COMMANDS, _.keys(updates)[0])) {
    const command = _.keys(updates)[0]
    const changes = updates[command]

    switch (command) {
      case '$merge': _.merge(next, changes); break
      case '$splice': next.splice.apply(next, changes); break
      case '$push': next.push.apply(next, changes); break
      case '$unshift': next.unshift.apply(next, changes); break
      case '$set': return changes
      case '$unset': return undefined
      case '$apply': return changes(next)
    }
  } else {
    _.forEach(updates, (newVal, key) => {
      if (!_.includes(COMMANDS, key)) {
        next[key] = update(next[key], updates[key]);
      }
    })
  }
  return next
}