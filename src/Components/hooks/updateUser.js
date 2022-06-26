import { useMutation } from 'react-query';
import { ENDPOINT } from './uri';
import { queryClient } from '../../App';

export const useUpdateUser = () => {
    return useMutation(async data => {
        return await fetch(ENDPOINT + 'users/updateUser', {
            method: 'PUT',
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