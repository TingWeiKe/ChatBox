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
        # user_id database
        self.answerdb = {}

        torch.backends.cudnn.enabled = False

    def get_answer(self, question, user_id, chinese):

        if user_id not in self.answerdb:
            self.answerdb[user_id] = ""
        self.prev_sentence = self.answerdb[user_id]

        if opt.prev_sent == 2:
            data = (self.prev_sentence + question) if not chinese else question
        
        # Dataset
        if chinese:
            data = list(convert(data, 't2s'))
            mydata = TrainData(opt.chinese_data_path, opt.conversation_path, opt.chinese_results_path, chinese, opt.prev_sent, True)
        else:
            data = ' '.join(data.split(' '))
            mydata = TrainData(opt.data_path, opt.conversation_path, opt.results_path, chinese, opt.prev_sent, True)
        
        # models
        seq2seq = NewSeq2seq(num_tokens=mydata.data.num_tokens,
                             opt=opt,
                             sos_id=mydata.data.word2id["<START>"],
                             chinese=chinese)
        if opt.model_path:
            if chinese:
                seq2seq.load_state_dict(torch.load(opt.chinese_model_path, map_location="cpu"))
            else:
                seq2seq.load_state_dict(torch.load(opt.model_path, map_location="cpu"))
        seq2seq = seq2seq.to(self.device)

        # Predict
        encoder_data = mydata._test_batch(data, 2*opt.mxlen if not chinese else opt.mxlen).to(self.device)
        decoded_indices, decoder_hidden1, decoder_hidden2 = seq2seq.evaluation(encoder_data)

        toks_to_replace = {"i":"I","im":"I'm","id":"I'd","ill":"I'll","iv":"I'v","hes":"he's","shes":"she's",
                           "youre":"you're","its":"it's","dont":"don't","youd":"you'd","cant":"can't","thats":"that's",
                           "isnt":"isn't","didnt":"didn't","hows":"how's","ive":"I've"}

        decoded_sequence = ""
        for idx in decoded_indices:
            sampled_tok = mydata.data.id2word[idx]
            if sampled_tok == "<START>":
                continue
            elif sampled_tok == "<EOS>":
                break
            else:
                if not chinese:
                    if sampled_tok in toks_to_replace:
                        sampled_tok = toks_to_replace[sampled_tok]
                    decoded_sequence += sampled_tok+' '
                else:
                    decoded_sequence += sampled_tok
        
        decoded_sequence = decoded_sequence if not chinese \
                           else convert(decoded_sequence,'s2t').replace("雞仔","我").replace("主人","哈囉").replace("主子哦","").replace("主子","哈囉")
        self.answerdb[user_id] = decoded_sequence
        return decoded_sequence