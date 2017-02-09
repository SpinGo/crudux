import expect from 'expect'
import { schema } from 'normalizr'

import getPageEntities from '../getPageEntities'

const userSchema = new schema.Entity('user')
const messageSchema = new schema.Entity('message', {
  user: userSchema,
})

describe('getPageEntities', () => {
  it('should return a function', () => {
    expect(getPageEntities()).toBeA('function')
  })

  it('should get an entity from the state', () => {
    expect(getPageEntities()(userSchema, 'user/page=1', {
      crudux: {
        page: {
          'user/page=1': {
            entities: [1],
          },
        },
        entities: {
          user: {
            1: { id: 1, name: 'Matt' },
          },
        },
      },
    })).toEqual([{ id: 1, name: 'Matt' }])
  })

  it('should denormalize the entity from the state', () => {
    expect(getPageEntities()(messageSchema, 'messages/page=1', {
      crudux: {
        page: {
          'messages/page=1': {
            entities: [1],
          },
        },
        entities: {
          user: {
            1: { id: 1, name: 'Matt' },
          },
          message: {
            1: { id: 1, user: 1, text: 'Thanks!' },
          },
        },
      },
    })).toEqual([
      {
        id: 1,
        user: { id: 1, name: 'Matt' },
        text: 'Thanks!',
      },
    ])
  })

  it('should get multiples entities from the state', () => {
    expect(getPageEntities()(messageSchema, 'messages/page=1', {
      crudux: {
        page: {
          'messages/page=1': {
            entities: [1, 2],
          },
        },
        entities: {
          user: {
            1: { id: 1, name: 'Matt' },
          },
          message: {
            1: { id: 1, user: 1, text: 'Thanks!' },
            2: { id: 2, user: 1, text: 'Bye!' },
          },
        },
      },
    })).toEqual([
      {
        id: 1,
        user: { id: 1, name: 'Matt' },
        text: 'Thanks!',
      },
      {
        id: 2,
        user: { id: 1, name: 'Matt' },
        text: 'Bye!',
      },
    ])
  })

  it('should use getCrudState, if provided', () => {
    const getOtherMountPoint = state => state.otherMountPoint
    expect(getPageEntities(getOtherMountPoint)(userSchema, 'user/page=1', {
      otherMountPoint: {
        page: {
          'user/page=1': {
            entities: [1],
          },
        },
        entities: {
          user: {
            1: { id: 1, name: 'Matt' },
          },
        },
      },
    })).toEqual([{ id: 1, name: 'Matt' }])
  })
})
