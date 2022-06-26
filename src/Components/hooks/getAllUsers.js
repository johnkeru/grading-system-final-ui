import {useInfiniteQuery, useQuery} from 'react-query';
import { ENDPOINT } from './uri';
import { queryClient } from '../../App';

export const useGetAllUsers = ({key}) => {


  const prefixUrl = !key ? 'getAllUsers' : 
  key === 'approval' ? 'getAllUsersApproversOnly' : 
  key === 'asc' ? 'getAllUsersApproversAscending' : 'getAllUsersApproversDescending';
  const fetchUsers = async (cursor) => {
      const res = await fetch(ENDPOINT+prefixUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              cursor: cursor.pageParam
            })
        })
      const results = await res.json()
      return {
        cursor: (key === 'asc' || key === 'desc') ? results.users.length - 1 : results.users[results.users.length - 1]?.id,
        hasMore: results.hasMore,
        users: results.users
      }
  }
  return useInfiniteQuery(['users', prefixUrl], fetchUsers, {
      getNextPageParam: ({hasMore, cursor}, _pages) => {
        if (hasMore) return cursor;
        return undefined;
      },
      onSuccess: ({pages}) => {
        pages.map(p => {
            p.users.forEach((d) => queryClient.setQueryData(['users', d.id], d))
        })
      }, 
    })
}

export const useGetOneUser = (id) => {
  return useQuery(['users', id], () => 
    fetch(ENDPOINT + 'users/getOneUser', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id})
    }).then(res => res.json())
    , {
    initialData: () => {
      return queryClient.getQueryData(['users', id])
    }
  })
}