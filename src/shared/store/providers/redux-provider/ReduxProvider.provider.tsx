"use client"

import { Provider } from "react-redux"
import { Store } from "../../store"

export default function ReduxProvider({
    children
}: Readonly<{children: React.ReactNode}>) {
    //This component i created, if i will extend forum and useage of persist
    return (
        <Provider store={Store}>
            {children}
        </Provider>
    )
}