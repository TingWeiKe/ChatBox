import nltk
import pickle
import re
import numpy as np
import csv
from opencc import OpenCC

# Paths for all resources for stackbot.
RESOURCE_PATH = {
    # For intent classifier
    'TFIDF_VECTORIZER': 'dialogue/stackbot_data/tfidf_vectorizer.pkl',
    'INTENT_RECOGNIZER': 'dialogue/stackbot_data/intent_recognizer.pkl',
    # For tag classifier
    'TAG_CLASSIFIER': 'dialogue/stackbot_data/tag_classifier.pkl',
    'THREAD_EMBEDDINGS_FOLDER': 'dialogue/stackbot_data/thread_embeddings_by_tags/',
    'WORD_EMBEDDINGS': 'dialogue/stackbot_data/word_embeddings.tsv',
    # Stopwords
    'STOP_WORDS': 'dialogue/stackbot_data/stopwords.pkl'
}

# Paths for all resources for moviebot.
class Config:

    # for dataset
    data_path = "dialogue/moviebot_data/movie_lines.tsv"
    conversation_path = "dialogue/moviebot_data/movie_conversations.txt"
    results_path = "dialogue/moviebot_data/data.bin"
    prev_sent = 2

    # for training
    epochs = 120
    batch_size = 256
    learning_rate = 1e-4

    # for model
    char_dim = 300
    latent_dim = 500
    mxlen= 20
    teacher_forcing_ratio = .5
    model_path = "dialogue/moviebot_data/memory.pth"

opt = Config()

# Download stopwords if download is True
download = False
if download:
    nltk.download('stopwords')
    from nltk.corpus import stopwords
    stopwords_set = set(stopwords.words('english'))
    with open(RESOURCE_PATH['STOP_WORDS'], 'wb') as f:
        pickle.dump(stopwords_set, f)

# Read the pickle file
def unpickle_file(filename):
    """Returns the result of unpickling the file content."""
    with open(filename, 'rb') as f:
        return pickle.load(f)

# Change words between traditional and simplified chinese
def convert(text, mode):
    cc = OpenCC(mode)
    return cc.convert(text)

# Preprocess the text
def text_prepare(text):
    """Performs tokenization and simple preprocessing."""
    
    replace_by_space_re = re.compile(r'[/(){}\[\]\|@,;]')
    bad_symbols_re = re.compile(r'[^0-9a-z #+_]')
    stopwords_set = unpickle_file(RESOURCE_PATH['STOP_WORDS'])

    text = text.lower()
    text = replace_by_space_re.sub(' ', text)
    text = bad_symbols_re.sub('', text)
    text = ' '.join([x for x in text.split() if x and x not in stopwords_set])

    return text.strip()

# Load the word embedding
def load_embeddings(embeddings_path):
    """Loads pre-trained word embeddings from tsv file.

    Args:
      embeddings_path - path to the embeddings file.

    Returns:
      embeddings - dict mapping words to vectors;
      embeddings_dim - dimension of the vectors.
    """
    import csv
    embeddings = {}
    with open(embeddings_path, newline='') as embedding_file:
        reader = csv.reader(embedding_file, delimiter='\t')
        for line in reader:
            word = line[0]
            embedding = np.array(line[1:]).astype(np.float32)
            embeddings[word] = embedding
        dim = len(line) - 1
    
    return embeddings, dim

# Turn question into embedding vectors
def question_to_vec(question, embeddings, dim):
    """Transforms a string to an embedding by averaging word embeddings."""

    question_list = question.split()
    length = len(question_list)
    word_vector = np.zeros((length,dim))
    
    if length == 0:
        return np.zeros(dim)
    else:
        for i in range(length):
            if question_list[i] in embeddings:
                word_vector[i] = embeddings[question_list[i]]
        
        array = []
        for i in range(word_vector.shape[0]):
            if (word_vector[i] != (np.zeros(dim))).any():
                array.append(i)
        
        if not len(array):
            return np.zeros(dim)
        else:
            vec = np.mean(word_vector[array], axis=0)
            return vec

