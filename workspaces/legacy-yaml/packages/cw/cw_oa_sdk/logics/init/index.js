/** 

 */
import { Invoker,Provider } from '@oa/iframe-channel'
export default async (options) => {
    const invoker = new Invoker(window.parent, 'OA_OPEN_FLOW')
    const data = await invoker.invoke('CONNECT')
    // TODO
    window.OaInvoker = invoker
    const provider = new Provider('OA_OPEN_FLOW')
    provider.register('UPDATE_ACCESS_TOKEN', (token) => {
        window.localStorage.setItem('oa_access_token', token)
    })
    return data
}