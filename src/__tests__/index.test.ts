import { describe, test, expect } from 'vitest'
import { sayHello } from '../index'

describe('index', () => {
  test('should say hello', () => {
    expect(sayHello()).toBe('Hello')
  })
})
