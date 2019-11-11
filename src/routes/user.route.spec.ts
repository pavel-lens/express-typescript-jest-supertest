import { Container } from 'typedi'
import supertest from 'supertest'

import server from '../server' // Link to your server file
const request = supertest(server)

const FakeLogger = {
  log: () => {},
}

beforeAll(() => {
  // Setting services is not needed as whole app is initialized
  // Override Logger to omit default console.log messages
  Container.set('Logger', FakeLogger)
})

describe('Route /users', () => {
  describe('GET /users', () => {
    it('should return all users with questions', async () => {
      const expected = [
        {
          name: "Pavel Svitek",
          questions: [
            {
              title: "What is DI?"
            },
            {
              title: "Why is it useful?"
            }
          ]
        },
        {
          name: "Thomas Fantomas",
          questions: [],
        }
      ]

      const res = await request.get('/users')

      expect(res).not.toBeUndefined()
      expect(res.status).toBe(200)
      expect(res.body).toEqual(expected)
    })
  })
})
