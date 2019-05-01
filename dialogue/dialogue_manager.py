import os
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

        # 3. Goal-oriented part:
        self.tag_classifier = unpickle_file(paths['TAG_CLASSIFIER'])
        self.stack_bot = StackBot(paths)

    def generate_dialogue(self, question, user_id, chinese):
        return self.movie_bot.get_answer(question, user_id, chinese)

    def generate_goal(self, prepared_question, features):
        tag = self.tag_classifier.predict(features)[0]
        thread_id = self.stack_bot.get_best_thread(prepared_question, tag)

        return self.ANSWER_TEMPLATE % (tag, thread_id)

    def generate_answer(self, question, mode, user_id):
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
                    response = self.generate_dialogue(question, user_id, False)
                    return response
                else:
                    response = self.generate_dialogue(question, user_id, True)
                    return response
            else:
                return self.generate_goal(prepared_question, features)

        elif mode == 'en':
            if(is_unicode(question)):
                response = self.generate_dialogue(question, user_id, False)
                return response
            else:
                time.sleep(1)
                response = 'Hmm, you are sending some weird characters to me...'
                return response

        elif mode == "cn":
            if(is_unicode(question)):
                time.sleep(1)
                response = '我不吃中文以外的東西拉!'
                return response
            else:
                response = self.generate_dialogue(question, user_id, True)
                return response
        
        elif mode == 'stof':
            prepared_question = text_prepare(question)
            features = self.tfidf_vectorizer.transform([prepared_question])
            return self.generate_goal(prepared_question, features)
