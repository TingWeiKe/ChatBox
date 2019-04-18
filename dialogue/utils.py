import nltk
import pickle
import re
import numpy as np
import csv

nltk.download('stopwords')
from nltk.corpus import stopwords

# Paths for all resources for the bot.
RESOURCE_PATH = {
    'INTENT_RECOGNIZER': 'dialogue/intent_recognizer.pkl',
    'TAG_CLASSIFIER': 'dialogue/tag_classifier.pkl',
    'TFIDF_VECTORIZER': 'dialogue/tfidf_vectorizer.pkl',
    'THREAD_EMBEDDINGS_FOLDER': 'dialogue/thread_embeddings_by_tags',
    'WORD_EMBEDDINGS': 'dialogue/word_embeddings.tsv',
}


def text_prepare(text):
    """Performs tokenization and simple preprocessing."""
    
    replace_by_space_re = re.compile('[/(){}\[\]\|@,;]')
    bad_symbols_re = re.compile('[^0-9a-z #+_]')
    stopwords_set = set(stopwords.words('english'))

    text = text.lower()
    text = replace_by_space_re.sub(' ', text)
    text = bad_symbols_re.sub('', text)
    text = ' '.join([x for x in text.split() if x and x not in stopwords_set])

    return text.strip()


def load_embeddings(embeddings_path):
    """Loads pre-trained word embeddings from tsv file.

    Args:
      embeddings_path - path to the embeddings file.

    Returns:
      embeddings - dict mapping words to vectors;
      embeddings_dim - dimension of the vectors.
    """
    
    # Hint: you have already implemented a similar routine in the 3rd assignment.
    # Note that here you also need to know the dimension of the loaded embeddings.
    # When you load the embeddings, use numpy.float32 type as dtype

    ########################
    #### YOUR CODE HERE ####
    ########################
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

def question_to_vec(question, embeddings, dim):
    """Transforms a string to an embedding by averaging word embeddings."""
    
    # Hint: you have already implemented exactly this function in the 3rd assignment.

    ########################
    #### YOUR CODE HERE ####
    ########################

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


def unpickle_file(filename):
    """Returns the result of unpickling the file content."""
    with open(filename, 'rb') as f:
        return pickle.load(f)