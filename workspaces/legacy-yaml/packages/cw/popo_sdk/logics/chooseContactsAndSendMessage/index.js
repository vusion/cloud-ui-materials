import { pp } from "@popo-bridge/web"
export default (...options) => {
    // TODO
    const [image,text] = options
    pp.chooseContactsAndSendMessage({
        // defaultSession: {
        //     // sessionId: '',
        //     sessionType: 0
        // },
        message: {
            image,
            text,
        },
    });
}