
# Installation
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
* Put folders and files below to Chatbox/dialogue/
>
        
    dialogue/
        + intent_recognizer.pkl
        + tfidf_vectorizer.pkl
        + tag_classifier.pkl
        + word_embeddings.tsv
       
       thread_embeddings_by_tags/
              + c_cpp.pkl
              + c#.pkl
              + java.pkl
              + javascript.pkl
              + php.pkl
              + python.pkl
              + r.pkl
              + ruby.pkl
              
        data/
              + dialogues.tsv
              + tagged_posts.tsv 
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
