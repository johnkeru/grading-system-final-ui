import { useMutation } from 'react-query';
import { ENDPOINT } from './uri';
import { queryClient } from '../../App';

export const useRegister = () => {
    return useMutation(async credentials => {
        return await fetch(ENDPOINT + 'users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(res => res.json())
    }, {
        onSettled: () => {
            queryClient.invalidateQueries('users');
        }
    })
}