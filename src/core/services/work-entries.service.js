import axios from 'axios'

const token = '16e2f0694a311151c01aa0a131b94a5a3ad7f110e12c2d8f459fcbb158214f5f';

const workEntriesApi = axios.create({
    baseURL: 'https://api-test.sesametime.com/schedule/v1/work-entries',
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const getWorkStatus = async ({ userId }) => {
    const { data: userList } = (await workEntriesApi.get()).data;
    const user = getUserById({ id: userId, list: userList });
    return user;
}

const getUserById = ({ id, list }) => {
    return list.find(user => user.id === id);
}