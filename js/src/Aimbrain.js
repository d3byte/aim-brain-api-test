Aimbrain.api.setKeyAndSecret(API_KEY, API_SECRET);
Aimbrain.api.setBaseUrl('https://api.aimbrain.com');
if (!Aimbrain.session.isSessionActive()) {
    Aimbrain.session.establishSession("[user id]");
}