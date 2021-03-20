import { Collection, MongoClient } from 'mongodb'
import { AccountModel } from '../../../../../domain/models/account'

export const MongoHelper = {
    client: null as MongoClient,

    async connect(url: string): Promise<void> {
        this.client = await MongoClient.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    },

    async disconnect(): Promise<void> {
        await this.client.close()
    },

    getColection(name: string): Collection {
        return this.client.db().collection(name)
    },

    map: (collection: any): any => {
        const { _id, ...collectiontWithouId } = collection
        return Object.assign({}, collectiontWithouId, { id: _id })
    }

}