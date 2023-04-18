import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useCache } from "./cache";

interface IOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: any;
  cache?: boolean;
}

export const useFetch = (url: string, callback: (data: any) => void, options?: IOptions) => {
  const { get, set } = useCache()
  const navigate = useNavigate()
  const token = useAuth(state => state.token)

  const fetchData = () => {
    fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  })
    .then((response) => response.json())
    .then((data) => {
      set(url, data);
      callback(data);
    })
    .catch((error) => {
      if (error.state === 401) navigate('/login')
      console.error(error);
    })
  }

  const refetch = () => {
    set(url, null)
    fetchData()
  }

  useEffect(() => {
    const cachedData = get(url);
    if (cachedData || options?.cache) {
      callback(cachedData);
    } else fetchData()
  }, [url, callback, get, set]);

  return { refetch }

}

export const useMutation = (url: string, {options, onSuccess}: { onSuccess: any, options?: any}) => {
  const navigate = useNavigate()
  const token = useAuth(state => state.token)
  const mutate = ({ opts }: { opts: any }) => {
    fetch(url, {
      method: options?.method || "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({...opts})
    })
      .then((response) => response.json())
      .then((data) => {
        onSuccess(data)
      })
      .catch((error) => {
        if (error.state === 401) navigate('/login')
        console.error(error);
      })
    }
  
    return { mutate }
}


