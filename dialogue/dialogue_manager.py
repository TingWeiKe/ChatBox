import os
from sklearn.metrics.pairwise import pairwise_distances_argmin

from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from opencc import OpenCC
from .utils import *


class ThreadRanker(object):
    def __init__(self, paths):
        self.word_embeddings, self.embeddings_dim = load_embeddings(
            paths['WORD_EMBEDDINGS'])
        self.thread_embeddings_folder = paths['THREAD_EMBEDDINGS_FOLDER']

    def __load_embeddings_by_tag(self, tag_name):
        embeddings_path = os.path.join(
            self.thread_embeddings_folder, tag_name + ".pkl")
        thread_ids, thread_embeddings = unpickle_file(embeddings_path)
        return thread_ids, thread_embeddings

    def get_best_thread(self, question, tag_name):
        """ Returns id of the most similar thread for the question.
            The search is performed across the threads with a given tag.
        """
        thread_ids, thread_embeddings = self.__load_embeddings_by_tag(tag_name)

        # HINT: you have already implemented a similar routine in the 3rd assignment.

        question_vec = question_to_vec(
            question, self.word_embeddings, self.embeddings_dim)
        best_thread = pairwise_distances_argmin(
            X=question_vec.reshape(1, self.embeddings_dim),
            Y=thread_embeddings,
            metric='cosine'
        )

        return thread_ids[best_thread][0]


class DialogueManager(object):
    def __init__(self, paths):
        print("Loading resources...")
        print(paths['INTENT_RECOGNIZER'])
        # Intent recognition:
        self.intent_recognizer = unpickle_file(paths['INTENT_RECOGNIZER'])
        self.tfidf_vectorizer = unpickle_file(paths['TFIDF_VECTORIZER'])

        self.ANSWER_TEMPLATE = 'I think its about [%s]\nThis thread might help you: https://stackoverflow.com/questions/%s'

        # Goal-oriented part:
        self.tag_classifier = unpickle_file(paths['TAG_CLASSIFIER'])
        self.thread_ranker = ThreadRanker(paths)

        # chichat_bot part:
        self.create_chitchat_bot()

    def create_chitchat_bot(self):
        def db_exists(path):
            return os.path.isfile(path)
        """Initializes self.chitchat_bot with some conversational model."""

        # Hint: you might want to create and train chatterbot.ChatBot here.
        # It could be done by creating ChatBot with the *trainer* parameter equals
        # "chatterbot.trainers.ChatterBotCorpusTrainer"
        # and then calling *train* function with "chatterbot.corpus.english" param
        en_db_exists = db_exists('en_db.sqlite3')
        cn_db_exists = db_exists('cn_db.sqlite3')
        print(en_db_exists, cn_db_exists)
        self.cn_chatbot = ChatBot(
            'chinese',
            trainer='chatterbot.trainers.ChatterBotCorpusTrainer',
            database_uri='sqlite:///cn_db.sqlite3',
            read_only=en_db_exists
        )

        self.chatbot = ChatBot(
            'english_bot',
            trainer='chatterbot.trainers.ChatterBotCorpusTrainer',
            database_uri='sqlite:///en_db.sqlite3',
            read_only=cn_db_exists
        )
        if(cn_db_exists != True):
            self.cn_chatbot.train("chatterbot.corpus.chinese")

        if(en_db_exists != True):
            self.chatbot.train("chatterbot.corpus.english")
            self.chatbot.set_trainer(ListTrainer)
            self.chatbot.train([
                "Hey",
                "Hello. How do you do?",
            ])
            self.chatbot.train([
                "How are you doing?",
                "I am good!",
            ])
            self.chatbot.train([
                "What's your hobby?",
                "I love soccer.",
            ])
            self.chatbot.train([
                "What is AI?",
                "Me",
            ])

    def generate_answer(self, question, mode):
        """Combines stackoverflow and chitchat parts using intent recognition."""
        def is_unicode(text):
            return len(text) == len(text.encode())

        def to_traditional_chinese(text):
            cc = OpenCC('s2t')
            return cc.convert(text)

        # Recognize intent of the question using `intent_recognizer`.
        # Don't forget to prepare question and calculate features for the question.
        prepared_question = text_prepare(question)
        features = self.tfidf_vectorizer.transform(
            [prepared_question])
        intent = self.intent_recognizer.predict(
            features)[0]

        if mode == 'en':
            if(is_unicode(question)):
                response = self.chatbot.get_response(question)
                return response
            else:
                response = 'Hmm, you are sending some weird characters to me...'
                return response

        elif mode == 'stof':
            tag = self.tag_classifier.predict(
                features)[0]
            thread_id = self.thread_ranker.get_best_thread(
                prepared_question, tag)

            return self.ANSWER_TEMPLATE % (tag, thread_id)
        elif mode == "cn":
            response = self.cn_chatbot.get_response(question)
            return to_traditional_chinese(str(response))
