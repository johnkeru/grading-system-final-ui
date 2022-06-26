import { useMutation } from 'react-query';
import { ENDPOINT } from './uri';
import { queryClient } from '../../App';

export const useAddUser = () => {
    return useMutation(async data => {
        return await fetch(ENDPOINT + 'users/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
    }, {
        onSettled: () => {
            queryClient.invalidateQueries('users');
        }
    })
}