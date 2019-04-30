import random
import os
from sklearn.metrics.pairwise import pairwise_distances_argmin
import torch
import torch.nn as nn
from torch.autograd import Variable
from torch.optim import Adam

from .moviebot_model import NewSeq2seq
from .moviebot_data import TrainData
from .utils import *

# Stackoverflow Robot
class StackBot:
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

        question_vec = question_to_vec(
            question, self.word_embeddings, self.embeddings_dim)
        best_thread = pairwise_distances_argmin(
            X=question_vec.reshape(1, self.embeddings_dim),
            Y=thread_embeddings,
            metric='cosine'
        )

        return thread_ids[best_thread][0]


# Movie Dialogue Robot
class MovieBot:
    def __init__(self):
        self.device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
        self.prev_sentence = ""
        # dataset
        self.mydata = TrainData(opt.data_path, opt.conversation_path, opt.results_path, opt.prev_sent, True)

        # models
        self.seq2seq =  NewSeq2seq(num_tokens=self.mydata.data.num_tokens,
                                   opt=opt,
                                   sos_id=self.mydata.data.word2id["<START>"])
        
        # user_id database
        self.answerdb = {}

        torch.backends.cudnn.enabled = False

    def get_answer(self, question, user_id):

        if user_id not in self.answerdb:
            self.answerdb['user_id'] = ""
        self.prev_sentence = self.answerdb['user_id']

        if opt.prev_sent == 2:
            data = self.prev_sentence + question
        data = ' '.join(data.split(' '))
        
        if opt.model_path:
            self.seq2seq.load_state_dict(torch.load(opt.model_path, map_location="cpu"))
        self.seq2seq = self.seq2seq.to(self.device)

        # Predict
        encoder_data = self.mydata._test_batch(data, 2*opt.mxlen).to(self.device)
        decoded_indices, decoder_hidden1, decoder_hidden2 = self.seq2seq.evaluation(encoder_data)
        
        toks_to_replace = {"i":"I","im":"I'm","id":"I'd","ill":"I'll","iv":"I'v","hes":"he's","shes":"she's",
                           "youre":"you're","its":"it's","dont":"don't","youd":"you'd","cant":"can't","thats":"that's",
                           "isnt":"isn't","didnt":"didn't","hows":"how's","ive":"I've"}

        decoded_sequence = ""
        for idx in decoded_indices:
            sampled_tok = self.mydata.data.id2word[idx]
            if sampled_tok == "<START>":
                continue
            elif sampled_tok == "<EOS>":
                break
            else:
                if sampled_tok in toks_to_replace:
                    sampled_tok = toks_to_replace[sampled_tok]
                decoded_sequence += sampled_tok+' '
        
        self.answerdb['user_id'] = decoded_sequence
        return decoded_sequence