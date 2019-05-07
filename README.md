# StackBoxer

A fancy chatroom for you to chat with a functional DL robot.
This work basically combines three separate work with full credits given to: <br> 
[Ting-Wei Ke](https://github.com/TIngWeiKe) and [Wayne Wu](https://github.com/waynewu6250): <br>

* [StackBot](https://github.com/waynewu6250/ML_DL_Projects/tree/master/1.StackBot-on-telegram): A coding assistant to help you search answers on stackoverflow with a given code query. Designed and created by [Wayne Wu](https://github.com/waynewu6250).
* [MovieBot](https://github.com/waynewu6250/ML_DL_Projects/tree/master/5.Movie-bot-pytorch): A common chatting robot trained by movie dialogues. Designed and created by [Wayne Wu](https://github.com/waynewu6250).
* [ChatBox](https://github.com/TIngWeiKe/ChatBox): A web full-stack application of fancy chatroom designed and created by [Ting-Wei Ke](https://github.com/TIngWeiKe).

## Installation
**Docker**
* If docker not installed on local terminal, please visit https://www.docker.com/get-started to download.

**Get Started**
* Clone this repository to your local machine

> 
    $ git clone https://github.com/waynewu6250/StackBoxer


* Run the bash script: <br>
(It will download data, generate backend in docker container and run frontend app in local terminal. Make sure you have unzip tools installed on your local terminal)
>
    sudo bash startup.sh

***************************************************
## Data Reference
* Here is the data link for your reference: <br>
https://www.dropbox.com/sh/6it184fgyln7jv2/AACC2Gy1Oct7SX7BvayypZACa?dl=0

>
    dialogue/
    └── moviebot_data/
        ├── chinese_data.bin
        ├── data.bin
        ├── memory_chinese.pth
        ├── memory.pth
        ├── movie_conversations.txt
        ├── movie_lines.tsv
        ├── new_data.conv
    
    └── stackbot_data/
        └── thread_embeddings_by_tags/
            ├── c_cpp.pkl
            ├── c#.pkl
            ├── java.pkl
            ├── javascript.pkl
            ├── php.pkl
            ├── python.pkl
            ├── r.pkl
            ├── ruby.pkl
        ├── intent_recognizer.pkl
        ├── stopwords.pkl
        ├── tag_classifier.pkl
        ├── tfidf_vectorizer.pkl
        ├── word_embeddings.tsv


