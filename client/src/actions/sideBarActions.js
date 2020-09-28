import { HIDE_SIDEBAR,SHOW_SIDEBAR } from './types'
 
export const hideSideBar = () => {
    return {
        type: HIDE_SIDEBAR,
    }
}

export const showSideBar = () => {
    return {
        type: SHOW_SIDEBAR
    }
}