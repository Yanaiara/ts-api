import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/criptograph/db/mongodb/helpers/mongo-helper'

describe('SignUp Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        const accountCollection = MongoHelper.getColection('accounts')
        await accountCollection.deleteMany({})
    })

    test('Should return an account on sucess', async () => {
        await request(app)
            .post('/api/signup')
            .send({
                name: 'Yara',
                email: 'yara@gmail.com',
                password: '123',
                passwordConfirmation: '123'
            })
            .expect(200)
    })
})