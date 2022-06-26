import { useMutation } from "react-query";
import { ENDPOINT } from "./uri";
import { queryClient } from "../../App";

export const useApproverLevel = () => {
    return useMutation((data) => {
        return fetch(ENDPOINT + 'users/approval', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    }, {
        onSettled: () => {
            queryClient.invalidateQueries('users');
        }
    })
}