from requests.compat import urljoin
from opencc import OpenCC
from .utils import *
from .dialogue_manager import DialogueManager


class BotHandler:
    def __init__(self, dialogue_manager):
        self.dialogue_manager = dialogue_manager
        self.answer = ''

    def get_answer(self, question, mode):
        return self.dialogue_manager.generate_answer(question, mode)

    def get_message(self, text, mode):
        cc = OpenCC('t2s')
        self.answer = self.get_answer(cc.convert(text), mode)
        return self.answer
