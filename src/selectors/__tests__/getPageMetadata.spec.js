import expect from 'expect'

import getPageMetadata from '../getPageMetadata'

describe('getPageMetadata', () => {
  it('should return a function', () => {
    expect(getPageMetadata()).toBeA('function')
  })

  it('should get page metadata from state', () => {
    expect(getPageMetadata()('user/page=1', {
      crudux: {
        pageMeta: {
          'user/page=1': { isFetching: false },
        },
      },
    })).toEqual({ isFetching: false })
  })

  it('should use getCrudState, if provided', () => {
    const getOtherMountPoint = state => state.otherMountPoint
    expect(getPageMetadata(getOtherMountPoint)('user/page=1', {
      otherMountPoint: {
        pageMeta: {
          'user/page=1': { isFetching: false },
        },
      },
    })).toEqual({ isFetching: false })
  })
})
