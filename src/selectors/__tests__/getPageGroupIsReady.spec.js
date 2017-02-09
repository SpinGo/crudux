import expect from 'expect'

import getPageGroupIsReady from '../getPageGroupIsReady'

describe('getPageGroupIsReady', () => {
  it('should return a function', () => {
    expect(getPageGroupIsReady()).toBeA('function')
  })

  it('should get page isReady for current page', () => {
    expect(getPageGroupIsReady()('main', {
      crudux: {
        pageGroup: {
          main: { currentPage: 'user/page=1' },
        },
        page: {
          'user/page=1': { hasBeenRequested: true, isFetching: false },
        },
      },
    })).toEqual(true)
  })

  it('should use getCrudState, if provided', () => {
    const getOtherMountPoint = state => state.otherMountPoint
    expect(getPageGroupIsReady(getOtherMountPoint)('main', {
      otherMountPoint: {
        pageGroup: {
          main: { currentPage: 'user/page=1' },
        },
        page: {
          'user/page=1': { hasBeenRequested: true, isFetching: false },
        },
      },
    })).toEqual(true)
  })
})
