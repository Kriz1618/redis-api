const redis = require("redis");

// const client = createClient({
//     host: '127.0.0.1',
//     port: 6379,
// });

// export const getItem = async (key) => {
//     return await client.get(key);
// };

// export const setItem = (key, value) => {
//     return await client.set(key, value);
// };

const createClient = (options) => {
    const client = () => {
        const client  = redis.createClient(options);
        
        const connection = async () => {
            try {
                await client.connect();
                console.log('Created Redis client');
            } catch (error) {
                throw new Error(error.message);                
            }
        };

        const getItem = async (key, db = 0) => {
            try {
                await client.select(db);
    
                return await client.get(key);            
            } catch (error) {
                throw new Error(error.message);
            }
        };
    
        const setItem = async (key, value, db = 0) => {
            try {
                await client.select(db);

                return await client.set(key, value, { EX: 15 });
            } catch (error) {
                throw new Error(error.message);            
            }
        };
    
        const restore = async (db = 0) => {
            try {
                return await client.flushDb(db);
            } catch (error) {
                throw new Error(error.message);            
            }
        }
    
        const getKeys = async (getValues, db = 0) => {
            try {
                await client.select(db);
    
                const keys = await client.keys('*');

                if (getValues) {
                    return await getValues(keys);
                }

                return keys;
            } catch (error) {
                throw new Error(error.message);            
            }
        };
    
        const getValues = async (keys, db = 0) => {
            try {
                await client.select(db);
    
                return await client.mGet(keys);
            } catch (error) {
                throw new Error(error.message);            
            }
        }
    
        const deleteKey = async (key, db = 0) => {
            try {
                await client.select(db);
    
                return await client.del(key);
            } catch (error) {
                throw new Error(error.message);            
            }
        }

        return {
            client, connection, getItem, setItem, restore, deleteKey, getKeys, getValues,
        }
    }

    return client;    
};

module.exports = createClient;