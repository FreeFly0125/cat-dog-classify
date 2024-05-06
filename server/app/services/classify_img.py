import numpy as np
from keras.preprocessing import image
from keras.applications.mobilenet import MobileNet, preprocess_input, decode_predictions
from app.consts.gVars import store

# Load the pre-trained MobileNet model
model = MobileNet(weights="imagenet")


def classify_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array_expanded_dims = np.expand_dims(img_array, axis=0)
    processed_img = preprocess_input(img_array_expanded_dims)

    predictions = model.predict(processed_img) 
    results = decode_predictions(predictions)[0]

    pRes = store.TYPE_CLASSIFY_MODEL.predict([results[0][1]])[0]

    return pRes
