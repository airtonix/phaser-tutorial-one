import { AccountModel, AccountMST } from './Account.model'
import { getAccountActions } from './Account.actions'

const accountTS = { ...(new AccountModel()) }
const accountMST = AccountMST.actions(self => getAccountActions(self)).create(accountTS)

it('setUsername', () => {
  accountMST.setUsername('user')
  expect(accountMST.username).toBe('user')
})

it('setFirstname', () => {
  accountMST.setFirstname('john')
  expect(accountMST.firstname).toBe('john')
})

it('setMiddlename', () => {
  accountMST.setMiddlename('the')
  expect(accountMST.middlename).toBe('the')
})

it('setLastname', () => {
  accountMST.setLastname('doe')
  expect(accountMST.lastname).toBe('doe')
})

it('addBalance', () => {
  accountMST.addBalance(200)
  expect(accountMST.balance).toBe(200)
})

it('removeBalance', () => {
  accountMST.removeBalance(200)
  expect(accountMST.balance).toBe(0)
})

it('setPassword', () => {
  accountMST.setPassword('qazqaz1234')
  expect(accountMST.password).toBe('qazqaz1234')
})