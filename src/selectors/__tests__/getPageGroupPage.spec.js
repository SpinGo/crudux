import expect from 'expect'

import getPageGroupPage from '../getPageGroupPage'

describe('getPageGroupPage', () => {
  it('should return a function', () => {
    expect(getPageGroupPage()).toBeA('function')
  })

  it('should get page data for current page', () => {
    expect(getPageGroupPage()('main', {
      crudux: {
        page: {
          'user/page=1': [1],
        },
        pageGroup: {
          main: { currentPage: 'user/page=1' },
        },
      },
    })).toEqual([1])
  })

  it('should use getCrudState, if provided', () => {
    const getOtherMountPoint = state => state.otherMountPoint
    expect(getPageGroupPage(getOtherMountPoint)('main', {
      otherMountPoint: {
        page: {
          'user/page=1': [1],
        },
        pageGroup: {
          main: { currentPage: 'user/page=1' },
        },
      },
    })).toEqual([1])
  })
})
