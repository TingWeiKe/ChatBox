from requests.compat import urljoin
from opencc import OpenCC
from .utils import *
from .dialogue_manager import DialogueManager


class BotHandler:
    def __init__(self, dialogue_manager):
        self.dialogue_manager = dialogue_manager
        self.answer = ''
    def to_traditional_chinese(self,text):
        cc = OpenCC('t2s')
        return cc.convert(text)

    def get_answer(self, question, mode):
        return self.dialogue_manager.generate_answer(question, mode)

    def get_message(self, text, mode):
        self.answer = self.get_answer(self.to_traditional_chinese(text), mode)
        return self.answer