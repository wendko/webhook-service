import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
const mongod = new MongoMemoryServer();

const config = {
    db: {
        test: 'mongodb://localhost/test',
    },
    connection: null,
};


function connect() {
    return new Promise((resolve, reject) => {
        if (config.connection) {
            return resolve();
        }

        const mongoUri = 'mongodb://localhost/test';

        mongoose.Promise = Promise;

        const options = {
            server: {
                auto_reconnect: true,
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 1000,
            },
        };

        mongoose.connect(mongoUri, options);

        config.connection = mongoose.connection;

        config.connection
            .once('open', resolve)
            .on('error', (e) => {
                if (e.message.code === 'ETIMEDOUT') {
                    console.log(e);

                    mongoose.connect(mongoUri, options);
                }

                console.log(e);
                reject(e);
            });
    });

}

function clearDatabase() {
    return new Promise(resolve => {
        let cont = 0;
        let max = Object.keys(mongoose.connection.collections).length;
        for (const i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function () {
                cont++;
                if (cont >= max) {
                    resolve();
                }
            });
        }
    });
}

export async function setupTest() {
    await connect();
    await clearDatabase();
}
// export class DBService {

//     constructor(
//         private db,
//         private server,
//         private connection
//     ) {
//         this.server = new MongoMemoryServer();
//     }

//     async start() {
//         const url = await this.server.getConnectionString();
//         this.connection = await MongoClient.connect(url, { useNewUrlParser: true });
//         this.db = this.connection.db(await this.server.getDbName());
//     }

//     stop() {
//         this.connection.close();
//         return this.server.stop();
//     }

//     cleanup() {
//         return Promise.all(COLLECTIONS.map(c => this.db.collection(c).remove({})));
//     }
// }

// module.exports = DBService;