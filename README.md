
## Installation
**Backend**
* Clone this repository to your local machine

> 

    $ git clone https://github.com/TIngWeiKe/ChatBox
* In the directory where you placed the cloned repo, create a virtual environment for Python:
>   
    $ pip install virtualenv
    $ cd Chatbox
    $ virtualenv env    
* Activate your virtual environment
>
    $ source env/bin/activate
* Install all required packages:
>
    $ pip3 install -r requirements.txt
* Put folders and files below to Chatbox/dialogue/ <br>
Download the data at the following link: <br>
https://drive.google.com/drive/u/1/folders/1MqiV3216tSacuT7ee_invZx8aMdvQSwT
>
    dialogue/
    └── moviebot_data/
        ├── all_toks_new.bin
        ├── data.bin
        ├── memory.pth
        ├── movie_conversations.txt
        ├── movie_lines.tsv
        ├── word2id.bin
    
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

* Start Django server    
>
    $ python -W ignore manage.py migrate
    $ python -W ignore manage.py runserver
              
              
 
**Frontend**

* In another terminal:
>
    $ cd frontend
* Install all required packages
>
    $ npm install
* Start Webpack-dev-server
>
    $ npm start
