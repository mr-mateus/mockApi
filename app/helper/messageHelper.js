'use strict';
const messageHelper = {
    getMessage: (textMessage, textHelp) => {
        const message = {
            message: textMessage,
            help: textHelp
        };
        return message;
    }
};

module.exports = messageHelper;
