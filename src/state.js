import React, {useState, useEffect} from 'react'

export const usenState = function () {
    const [name, setName] = useState(null)
    return {name, setName}
}