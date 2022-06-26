import { useMutation } from 'react-query';
import { ENDPOINT } from './uri';

export const useReset = () => {
    return useMutation(async email => {
        return await fetch(ENDPOINT + 'checkEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        }).then(res => res.json())
    })
}