import { useMutation } from "react-query";
import { ENDPOINT } from './uri';

export const useMe = () => {
    return useMutation(async (token) => {
        return await fetch(ENDPOINT + 'me', {
            method: 'GET',
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : 'Bearer ' + localStorage.getItem('token')
                }
        }).then(res => res.json())
    })
}