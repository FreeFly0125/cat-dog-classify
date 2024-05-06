import os
import pickle

class Settings:
    PUBLIC_FOLDER = "./public"
    IMAGE_FOLDER = "/images"
    FETCH_URL = "https://api.exactly.ai/v0/careers/cat-or-dog/69b31be8-8cf0-4697-b738-94bc13e878e0/"

    def __init__(self) -> None:
        os.makedirs(self.PUBLIC_FOLDER + self.IMAGE_FOLDER, exist_ok=True)


class Store:
    IMAGE_STORE = []

    with open('./app/type_classification/type_classify.model', 'rb') as file:
        TYPE_CLASSIFY_MODEL = pickle.load(file)

    def update_img_store(self, filepath):
        self.IMAGE_STORE.append(filepath)
        if len(self.IMAGE_STORE) > 10:
            old_filepath = self.IMAGE_STORE[0]
            os.remove(old_filepath)
            self.IMAGE_STORE = self.IMAGE_STORE[1:]


settings = Settings()
store = Store()
