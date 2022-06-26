import {useMutation} from 'react-query'
import { ENDPOINT } from './uri'
import { queryClient } from '../../App'

export const useAddUserRole = () => {
    return useMutation(({role, user_id}) => {
        fetch(ENDPOINT + 'addRole', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role, user_id })
        }).then(res => res.json())
    }, {
        onSettled: () => {
            queryClient.invalidateQueries('roles')
            queryClient.invalidateQueries('users')
        }
    })
}