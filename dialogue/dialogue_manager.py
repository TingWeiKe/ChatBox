import os
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from .utils import *
from .bot import StackBot, MovieBot
import time

class StackBoxer:
    def __init__(self, paths):
        self.ANSWER_TEMPLATE = 'I think its about [%s]\nThis thread might help you: https://stackoverflow.com/questions/%s'

        print("Loading resources...")

        # 1. Intent recognition:
        self.tfidf_vectorizer = unpickle_file(paths['TFIDF_VECTORIZER'])
        self.intent_recognizer = unpickle_file(paths['INTENT_RECOGNIZER'])

        # 2. Dialogue-oriented part:
        self.movie_bot = MovieBot()
        self.create_chinese_bot()

        # 3. Goal-oriented part:
        self.tag_classifier = unpickle_file(paths['TAG_CLASSIFIER'])
        self.stack_bot = StackBot(paths)

    def generate_dialogue(self, question):
        time.sleep(1)
        return self.movie_bot.get_answer(question)

    def generate_goal(self, prepared_question, features):
        tag = self.tag_classifier.predict(features)[0]
        thread_id = self.stack_bot.get_best_thread(prepared_question, tag)

        return self.ANSWER_TEMPLATE % (tag, thread_id)

    def create_chinese_bot(self):
        def db_exists(path):
            return os.path.isfile(path)
        """Initializes chinese robot with customized conversational model."""

        cn_db_exists = db_exists('cn_db.sqlite3')

        self.cn_chatbot = ChatBot(
            'chinese',
            trainer='chatterbot.trainers.ChatterBotCorpusTrainer',
            database_uri='sqlite:///cn_db.sqlite3',
            read_only=cn_db_exists
        )

        if(cn_db_exists != True):
            self.cn_chatbot.train("chatterbot.corpus.chinese")

    def generate_answer(self, question, mode, use_id):
        """Combines stackoverflow and chitchat parts using intent recognition."""
        def is_unicode(text):
            return len(text) == len(text.encode())

        if mode == 'mix':
            # 1. Intent recognition:
            prepared_question = text_prepare(question)
            features = self.tfidf_vectorizer.transform([prepared_question])
            intent = self.intent_recognizer.predict(features)[0]

            # 2. Dialogue-oriented part:
            if intent == 'dialogue':
                if(is_unicode(question)):
                    response = self.generate_dialogue(question)
                    return response
                else:
                    response = 'Hmm, you are sending some weird characters to me...'
                    return response
            else:
                return self.generate_goal(prepared_question, features)

        elif mode == 'en':
            if(is_unicode(question)):
                response = self.generate_dialogue(question)
                return response
            else:
                response = 'Hmm, you are sending some weird characters to me...'
                return response

        elif mode == 'stof':
            prepared_question = text_prepare(question)
            features = self.tfidf_vectorizer.transform([prepared_question])
            return self.generate_goal(prepared_question, features)

        elif mode == "cn":
            response = self.cn_chatbot.get_response(question)
            return convert(str(response), 's2t')
