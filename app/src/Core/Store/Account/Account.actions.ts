import { IAccount } from './Account.model'

export const getAccountActions = <T extends IAccount>(self: T) => ({
  addBalance (bal = 1): number { return self.balance += bal },
  removeBalance (bal = 1): number { return self.balance -= bal },
  setFirstname (name = ''): string {
    self.firstname = name
    return self.firstname
  },
  setMiddlename (name = ''): string {
    self.middlename = name
    return self.middlename
  },
  setLastname (name = ''): string {
    self.lastname = name
    return self.lastname
  },
  setUsername (name = ''): string {
    self.username = name
    return self.username
  },
  setPassword (pw = ''): string {
    self.password = pw
    return self.password
  },
})
