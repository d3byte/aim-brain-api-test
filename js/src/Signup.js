class Signup extends Page {
    constructor() {
        super('voice', 'signup-form');

        this.handleVoiceEnrollment = this.handleVoiceEnrollment.bind(this);

        this.bindSubmitEvent();
    }

    proceedHandler() {
        let isSessionActive = true;
        switch (this.type) {
            case 'facial':
                return null;
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
}