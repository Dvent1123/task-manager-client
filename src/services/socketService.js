import React from 'react'
import socketIoClient from 'socket.io-client'

    function getSocket(){
        const tokenString = sessionStorage.getItem('token')

        if(tokenString) {
            const parseToken = JSON.parse(tokenString)
            const realToken = parseToken.token
            return socketIoClient(`${process.env.REACT_APP_API}`, {transports: ['websocket', 'polling'], auth: {token: realToken}})
        }

        return socketIoClient(`${process.env.REACT_APP_API}`)
    }

export const socket = getSocket()
export const SocketContext = React.createContext()

