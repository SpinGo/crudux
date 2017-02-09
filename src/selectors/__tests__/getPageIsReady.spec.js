import expect from 'expect'

import getPageIsReady from '../getPageIsReady'

describe('getPageIsReady', () => {
  it('should return a function', () => {
    expect(getPageIsReady()).toBeA('function')
  })

  it('should be true when has been requested and not fetching', () => {
    expect(getPageIsReady()('user/page=1', {
      crudux: {
        page: {
          'user/page=1': { hasBeenRequested: true, isFetching: false },
        },
      },
    })).toEqual(true)
  })

  it('should be false if fetching', () => {
    expect(getPageIsReady()('user/page=1', {
      crudux: {
        page: {
          'user/page=1': { hasBeenRequested: true, isFetching: true },
        },
      },
    })).toEqual(false)
  })

  it('should be false if was not requested', () => {
    expect(getPageIsReady()('user/page=1', {
      crudux: {
        page: {
          'user/page=1': { hasBeenRequested: false },
        },
      },
    })).toEqual(false)
  })

  it('should be false page doesn\'t exist', () => {
    expect(getPageIsReady()('user/page=1', {
      crudux: { page: {} },
    })).toEqual(false)
  })

  it('should use getCrudState, if provided', () => {
    const getOtherMountPoint = state => state.otherMountPoint
    expect(getPageIsReady(getOtherMountPoint)('user/page=1', {
      otherMountPoint: {
        page: {
          'user/page=1': { hasBeenRequested: true, isFetching: false },
        },
      },
    })).toEqual(true)
  })
})
