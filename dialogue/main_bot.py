from requests.compat import urljoin
from .utils import *
from .dialogue_manager import DialogueManager

def is_unicode(text):
    return len(text) == len(text.encode())

class BotHandler:

    def __init__(self, dialogue_manager):
        self.dialogue_manager = dialogue_manager
        self.answer = ''

    def get_answer(self, question):
        return self.dialogue_manager.generate_answer(question)
    
    def get_message(self, text):
        if is_unicode(text):
            self.answer = self.get_answer(text)
        else:
            self.answer = "Hmm, you are sending some weird characters to me..."
        return self.answer

# Embed the following code in main() in your django function
# def main():

    # dialogue_manager = DialogueManager(RESOURCE_PATH)
    # bot = BotHandler(dialogue_manager)
    # print("Hi, I am your project bot. How can I help you today?")
    
    # Input: replace input() below to the received message
    # Output: bot.get_message(...) returns the response
    # print(bot.get_message('Hi Robot'))


# if __name__ == "__main__":
#     main()



  