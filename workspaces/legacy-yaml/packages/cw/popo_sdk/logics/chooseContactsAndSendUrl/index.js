import { pp } from "@popo-bridge/web"
export default async (...options) => {
    // TODO
    const [url='https://www.163.com/',urlTitle="设置的Title"] = options
    const result = await pp.chooseContactsAndSendUrl({ url, urlTitle });
    console.log(result);
}