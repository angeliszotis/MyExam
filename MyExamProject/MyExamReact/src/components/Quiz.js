import React, { useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api'
import useStateContext from '../hooks/useStateContext'
import { useNavigate } from 'react-router'

export default function Quiz() {

    const [qns, setQns] = useState([])


    useEffect(() => {

        createAPIEndpoint(ENDPOINTS.question)
            .fetch()
            .then(res => {
                setQns(res.data)
                console.log(res.data)
            })
            .catch(err => { console.log(err); })


    }, [])

    return (
        <div>Quiz</div>
    )
}
