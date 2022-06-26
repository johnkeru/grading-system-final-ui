import { useMutation, useQuery } from "react-query";
import { ENDPOINT } from "./uri";
import {queryClient} from '../../App'

export const useRoles = () => {
    return useQuery("roles", async () => {
        const data = await fetch(ENDPOINT + 'role-lists')
        const roles = await data.json() 
        return roles
    })
}
export const useAddRole = () => {
    return useMutation((role_name) => {
        fetch(ENDPOINT + 'add-role', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role_name })
        }).then(res => res.json())
    }, {
        onSettled: () => {
            queryClient.invalidateQueries('roles')
            queryClient.invalidateQueries('users')
        }
    })
}