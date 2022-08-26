import { useState, useEffect } from 'react'



export const useFetch = (url) => {
    const [data, setData] = useState(null)
    //post
    const [config, setConfig] = useState(null)
    const [ method, setMethod ] = useState(null)
    const [callFetch, setCallFetch] = useState(false)


    //loading 
    const [loading, setLoading] = useState(false)

    //tratando erro 
    const [error, setError] = useState(null)


    const httpConfig = (data, method)=>{
        if(method === "POST"){
            setConfig({
                method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            setMethod(method)
        }
    }

    useEffect(()=>{
        setLoading(true)

        const fetchData = async ()=>{

        try {
             const res = await fetch(url)
             const json = await res.json()
              setData(json)
        } catch (e) {

            setError("houve algum erro ao carregar os dados")
            console.log(e.message)
            
        }
        setLoading(false)
        }
        fetchData()
    }, [url, callFetch])

    useEffect(()=>{
        const http = async ()=>{
        if(method === "POST"){
            let fetchOptions = [url, config]
            const res = await fetch(...fetchOptions)
            const json = await res.json()
            setCallFetch(json)
        }
    }
    http()
    }, [config, method, url])


    return { data, httpConfig, loading, error }
}