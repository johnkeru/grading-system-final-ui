import { useMutation } from 'react-query';
import { ENDPOINT } from './uri';

export const useChangePassword = () => {
    return useMutation(async credentials => {
        return await fetch(ENDPOINT + 'changePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(res => res.json())
    })
}