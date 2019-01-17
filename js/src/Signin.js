class Signin extends Page {
    constructor() {
        super('voice', 'signin-form');

        this.handleVoiceAuth = this.handleVoiceAuth.bind(this);

        this.bindSubmitEvent();
    }

    proceedHandler() {
        let isSessionActive = true;
        switch (this.type) {
            case 'facial':
                return null;
            case 'voice':
                return this.handleVoiceAuth();
            default:
                return console.log('None');
        }
    }

    handleVoiceAuth() {
        Aimbrain.voice.getAuthenticationToken().then((voiceToken) => {
            console.log(voiceToken);
            Aimbrain.voice.recordVoice('You will need to read the sentence ', { capturingText: voiceToken, helpText: 'Read the sentence' }).then((result) => {
                Aimbrain.voice.authenticateWithData(result).then(res => {
                    if (res.liveliness > 0.8 && res.score > 0.5) {
                        alert('You are logged in');
                    } else {
                        alert ('Try to signup first!');
                    }
                }).catch(error => {
                    console.log(error);
                });
            })
        });
    }
}