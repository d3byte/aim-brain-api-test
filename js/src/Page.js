class Page {
    constructor(defaultType = 'facial', formId = '') {
        this.type = defaultType;
        this.formId = formId;
        this.form = null;
        this.stage = 0;

        this.bindSubmitEvent = this.bindSubmitEvent.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.proceedHandler = this.proceedHandler.bind(this);
        this.bindBehaviorCollection = this.bindBehaviorCollection.bind(this);
    }

    proceedHandler() {}

    bindSubmitEvent() {
        this.form = document.getElementById(this.formId);
        if (!this.form) { return }
        this.form.addEventListener('submit', this.submitHandler);
    }

    bindBehaviorCollection() {
        const element = document.body;
        Aimbrain.behaviour.setAimbrainId('document-body', element);
        Aimbrain.behaviour.startTracking();
    }

    submitHandler(e) {
        e.preventDefault();
        this.type = this.form.querySelector('input[name="type"]:checked').value;
        this.proceedHandler();
    }
}