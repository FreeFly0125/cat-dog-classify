import csv
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

TYPE_CLASSIFY_MODEL_NAME = "type_classify.model"

if __name__ == "__main__":
    data = []
    with open("dataset.csv", "r") as file:
        reader = csv.reader(file)
        for row in reader:
            data.append(row)

    breeds = [row[0] for row in data]
    types = [row[1] for row in data]

    model = make_pipeline(TfidfVectorizer(), MultinomialNB())

    model.fit(breeds, types)

    with open(TYPE_CLASSIFY_MODEL_NAME, "wb") as file:
        pickle.dump(model, file)
