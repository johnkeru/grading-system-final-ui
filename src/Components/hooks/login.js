import { useMutation } from 'react-query';
import { ENDPOINT } from './uri';

export const useLogin = () => {
    return useMutation(async credentials => {
        return await fetch(ENDPOINT + 'users/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(res => res.json())
    })
}