import expect from 'expect'

import getPageGroupPageKey from '../getPageGroupPageKey'

describe('getPageGroupPageKey', () => {
  it('should return a function', () => {
    expect(getPageGroupPageKey()).toBeA('function')
  })

  it('should get pageGroup currentPage from state', () => {
    expect(getPageGroupPageKey()('main', {
      crudux: {
        pageGroup: {
          main: { currentPage: 'user/page=1' },
        },
      },
    })).toEqual('user/page=1')
  })

  it('should use getCrudState, if provided', () => {
    const getOtherMountPoint = state => state.otherMountPoint
    expect(getPageGroupPageKey(getOtherMountPoint)('main', {
      otherMountPoint: {
        pageGroup: {
          main: { currentPage: 'user/page=1' },
        },
      },
    })).toEqual('user/page=1')
  })
})
