class Signin extends Page {
    constructor() {
        super('voice', 'signin-form');

        this.handleVoiceAuth = this.handleVoiceAuth.bind(this);
        this.handleFaceAuth = this.handleFaceAuth.bind(this);

        this.bindSubmitEvent();
        this.bindBehaviorCollection();
    }

    proceedHandler() {
        let isSessionActive = true;
        switch (this.type) {
            case 'facial':
                return this.handleFaceAuth();
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

    handleFaceAuth() {
        Aimbrain.facial.recordFaceVideo().then((result) => {
            console.log(result);
            Aimbrain.facial.authenticateWithData(result).then(res => {
                console.log(res);
                if (res.liveliness > 0.8 && res.score > 0.5) {
                    alert('You are logged in');
                } else {
                    alert ('Try to signup first!');
                }
            }).catch(err => {
                console.log(err);
            })
        }).catch((error) => {
            // video recording failed, use error code find out why.
            switch (error) {
                case Aimbrain.facial.RecordingError.PopupClosed:
                // popup closed by user
                break;
                case Aimbrain.facial.RecordingError.NotSupported:
                // browser does not support recording
                break;
                case Aimbrain.facial.RecordingError.NoDevice:
                // there is no recording device present
                break;
            }
        });
    }
}