import expect from 'expect'

import getPageGroupPageMetadata from '../getPageGroupPageMetadata'

describe('getPageGroupPageMetadata', () => {
  it('should return a function', () => {
    expect(getPageGroupPageMetadata()).toBeA('function')
  })

  it('should get page metadata for current page', () => {
    expect(getPageGroupPageMetadata()('main', {
      crudux: {
        pageGroup: {
          main: { currentPage: 'user/page=1' },
        },
        pageMeta: {
          'user/page=1': { isFetching: false },
        },
      },
    })).toEqual({ isFetching: false })
  })

  it('should use getCrudState, if provided', () => {
    const getOtherMountPoint = state => state.otherMountPoint
    expect(getPageGroupPageMetadata(getOtherMountPoint)('main', {
      otherMountPoint: {
        pageGroup: {
          main: { currentPage: 'user/page=1' },
        },
        pageMeta: {
          'user/page=1': { isFetching: false },
        },
      },
    })).toEqual({ isFetching: false })
  })
})
