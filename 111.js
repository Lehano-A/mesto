import Message from "../components/Message.js";
import Section from "../components/Section.js";
import Form from "../components/Form.js";
import Api from "../components/Api.js";
import UserInfo from "../components/UseInfo.js";

const messageSelector = '.message-template';
const messagesWrap = '.messages__list';
const messagesForm = '.messages-form';
const usernameElement = '.user_name';

const api = new Api({
    address: 'https://praktikum-19-sprint9.vercel.app/api',
    token: 'test'
})

let user = null;

const userInfo = new UserInfo({
    element: usernameElement
})





const createMessage = (data) => {
    const message = new Message({
        data: {
            ...data,
            currentUser: user._id
        },
        handleDeleteIconClick: () => {
            api.deleteMessage(message.getId())
                .then(() => message.removeMessage())
                .catch(e => console.log('РћС€РёР±РєР° РїСЂРё СѓРґР°Р»РµРЅРёРё'))
                .finally()
        }
    }, messageSelector);


    return message.getView()
};

const messagesList = new Section({
        renderer: (data) => {
            messagesList.addItem(createMessage(data));
        }
    }, messagesWrap
);





const form = new Form({
    handleFormSubmit: (data) => {
        api.createMessage({
            ...data,
            user: user.name,
            owner: user._id,
        })
            .then(result => {
                messagesList.addItem(createMessage({...result.data}))
            })
            .catch(e => console.log(`РћС€РёР±РєР° РїСЂРё СЃРѕР·РґР°РЅРёРё СЃРѕРѕР±С‰РµРЅРёСЏ: ${e}`))
    }
}, messagesForm);

form.render();




// api.getMessages()
//     .then(result => {
//         messagesList.renderItems(result)
//     })
//     .catch(e => console.log(`РћС€РёР±РєР° РїСЂРё РїРѕР»СѓС‡РµРЅРёРё СЃРѕРѕР±С‰РµРЅРёР№: ${e}`))
//
//
// api.getUserData()
//     .then(userData => {
//         console.log('USER:', userData)
//         user = userData.data;
//     })
//     .catch(e => console.log(`РћС€РёР±РєР° РїСЂРё РїРѕР»СѓС‡РµРЅРёРё РґР°РЅРЅС‹С… user: ${e}`))


Promise.all([api.getUserData(), api.getMessages()])
    .then(([userData, messages]) => {

        user = userData.data;
        userInfo.setUser({
            user: user.name,
            userID: user._id
        })
        messagesList.renderItems(messages)
})
