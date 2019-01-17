class Signup extends Page {
    constructor() {
        super('voice', 'signup-form');

        this.handleVoiceEnrollment = this.handleVoiceEnrollment.bind(this);
        this.handleFaceEnrollment = this.handleFaceEnrollment.bind(this);

        this.bindSubmitEvent();
        this.bindBehaviorCollection();
    }

    proceedHandler() {
        let isSessionActive = true;
        switch (this.type) {
            case 'facial':
                return this.handleFaceEnrollment();
            case 'voice':
                return this.handleVoiceEnrollment();
            default:
                return console.log('None');
        }
    }

    handleVoiceEnrollment() {
        const tokenKeys = Aimbrain.voice.getEnrollmentTokenKeys();
        let currentStageIndex = 0;
        console.log(tokenKeys);
        const handleEnrollmentStage = currentStepKey => {
            Aimbrain.voice.getEnrollmentToken(currentStepKey).then((voiceToken) => {
                // document.querySelector('.aimbrain-voice-header-label').innerText = 'Please, read the sentence below';
                // document.querySelector('.aimbrain-voice-voice-token').innerText = voiceToken;
                Aimbrain.voice.recordVoice(currentStepKey, { capturingText: voiceToken, helpText: 'You will need to read the sentence' }).then((voiceRecord) => {
                    Aimbrain.voice.enrollWithData(voiceRecord).then((result) => {
                        console.log(result)
                        currentStageIndex++;
                        if (currentStageIndex === tokenKeys.length) {
                            // shit
                            return;
                        }
                        handleEnrollmentStage(tokenKeys[currentStageIndex]);
                    }).catch(error => {
                        console.log(error);
                    });
                });
            }).catch(error => {
                console.log(error);
            });
        }
        handleEnrollmentStage(tokenKeys[currentStageIndex]);
    }

    handleFaceEnrollment() {
        Aimbrain.facial.recordFaceVideo().then((result) => {
            console.log(result);
            Aimbrain.facial.enrollWithData(result).then(res => {
                if (res.imagesCount > 0) {
                    alert('You have enrolled!');
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