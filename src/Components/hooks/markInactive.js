import { useMutation } from "react-query";
import { ENDPOINT } from "./uri";
import { queryClient } from "../../App";

export const useMarkInactive = () => {
    return useMutation(async (data) => {
        return fetch(ENDPOINT + 'users/markInactive', {
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