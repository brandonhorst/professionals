import update from '../src/update'
import {expect} from 'chai'

describe('update', () => {
  it('does nothing if there are no commands', () => {
    const start = {x: 1}
    const res = update(start, {})

    expect(start).to.eql({x: 1})
    expect(res).to.eql({x: 1})
  })

  it('$merge merges', () => {
    const start = {x: 1}
    const res = update(start, {$merge: {y: 2}})

    expect(start).to.eql({x: 1})
    expect(res).to.eql({x: 1, y: 2})
  })

  it('$merge merges (nested)', () => {
    const start = {x: {y: 1}}
    const res = update(start, {x: {$merge: {z: 2}}})

    expect(start).to.eql({x: {y: 1}})
    expect(res).to.eql({x: {y: 1, z: 2}})
  })

  it('$merge merges (multiple)', () => {
    const start = {x: {y: 1}, w: {z: 2}}
    const res = update(start, {x: {$merge: {a: 1}}, w: {$merge: {z: 3, b: 2}}})

    expect(start).to.eql({x: {y: 1}, w: {z: 2}})
    expect(res).to.eql({x: {y: 1, a: 1}, w: {z: 3, b: 2}})
  })

  it('$unshift unshifts', () => {
    const start = {x: [1, 2]}
    const res = update(start, {x: {$unshift: [0]}})

    expect(start).to.eql({x: [1, 2]})
    expect(res).to.eql({x: [0, 1, 2]})
  })

  it('$push pushes', () => {
    const start = {x: [1, 2]}
    const res = update(start, {x: {$push: [3]}})

    expect(start).to.eql({x: [1, 2]})
    expect(res).to.eql({x: [1, 2, 3]})
  })

  it('$splice splices', () => {
    const start = {x: [1, 2]}
    const res = update(start, {x: {$splice: [1, 1, 3, 4]}})

    expect(start).to.eql({x: [1, 2]})
    expect(res).to.eql({x: [1, 3, 4]})
  })

  it('$set sets', () => {
    const start = {x: [1, 2]}
    const res = update(start, {x: {$set: 3}})

    expect(start).to.eql({x: [1, 2]})
    expect(res).to.eql({x: 3})
  })

  it('$unset unsets', () => {
    const start = {x: {y: 1}}
    const res = update(start, {x: {$unset: ''}})

    expect(start).to.eql({x: {y: 1}})
    expect(res).to.eql({x: undefined})
  })

  it('$apply applies', () => {
    const start = {x: 2}
    const res = update(start, {x: {$apply: x => x + 8}})

    expect(start).to.eql({x: 2})
    expect(res).to.eql({x: 10})
  })

  it('$apply applies without mutating', () => {
    const start = {x: 2}
    const res = update(start, {x: {$apply: x => ++x}})

    expect(start).to.eql({x: 2})
    expect(res).to.eql({x: 3})
  })
})
