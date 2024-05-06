import requests
import base64
from dotenv import load_dotenv
from app.consts.gVars import settings, store
from app.services.classify_img import classify_image
import time

def fetch_animal_imgs():
    start_timestamp = time.time()

    animal_img_data = requests.post(settings.FETCH_URL).json()
    animal_img_data_decoded = base64.b64decode(animal_img_data)

    filepath = settings.PUBLIC_FOLDER+settings.IMAGE_FOLDER+f"/{start_timestamp}.png"
    store.update_img_store(filepath)

    with open(filepath, "wb") as file:
        file.write(animal_img_data_decoded)

    animal_type = classify_image(filepath)

    end_timestamp = time.time()

    return (filepath[1:], end_timestamp - start_timestamp, animal_type)
