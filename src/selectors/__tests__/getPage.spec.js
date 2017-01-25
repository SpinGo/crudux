import expect from 'expect'

import getPage from '../getPage'

describe('getPage', () => {
  it('should return a function', () => {
    expect(getPage()).toBeA('function')
  })

  it('should get page data from state', () => {
    expect(getPage()('user/page=1', {
      crudux: {
        page: {
          'user/page=1': [1, 2, 3],
        },
      },
    })).toEqual([1, 2, 3])
  })

  it('should use getCrudState, if provided', () => {
    const getOtherMountPoint = state => state.otherMountPoint
    expect(getPage(getOtherMountPoint)('user/page=1', {
      otherMountPoint: {
        page: {
          'user/page=1': [1, 2, 3],
        },
      },
    })).toEqual([1, 2, 3])
  })
})
