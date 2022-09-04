import React from "react"

export const stringQueryParamsToObject = (query: string) => {
    const out: {[k: string]: string} = {}

    query
        .replace('?', '')
        .split('&')
        .forEach(pair => {
            const keyVal = pair.split('=')
            out[keyVal[0]] = keyVal[1]
        })

    return out
}