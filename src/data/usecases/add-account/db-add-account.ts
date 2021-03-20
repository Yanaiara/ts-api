import { AddAccount, AddAccountModel, Encrypter, AccountModel, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
    private readonly encrypter: Encrypter
    private readonly addAccountRepository: AddAccountRepository

    constructor(encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
        this.encrypter = encrypter
        this.addAccountRepository = addAccountRepository
    }

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const hashed_password = await this.encrypter.encrypt(accountData.password)
        const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashed_password }))
        return account
    }
}