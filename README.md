
## Installation
**Docker**
* If docker not installed on local terminal, please visit https://www.docker.com/get-started to download.

**Get Started**
* Clone this repository to your local machine

> 
<<<<<<< HEAD

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
=======
    $ git clone https://github.com/waynewu6250/StackBoxer

<<<<<<< HEAD
>>>>>>> 651be3d74a9afad5751104bde712f4579d3c6d6e
* Put folders and files below to Chatbox/dialogue/ <br>
Download the data at the following link: <br>
https://drive.google.com/drive/u/1/folders/1MqiV3216tSacuT7ee_invZx8aMdvQSwT
=======

* Run the bash script: <br>
(It will download data, generate backend in docker container and run frontend app in local terminal. Make sure you have unzip tools installed on your local terminal)
>
    sudo bash startup.sh

***************************************************
## Data Reference
* Here is the data link for your reference: <br>
https://www.dropbox.com/sh/6it184fgyln7jv2/AACC2Gy1Oct7SX7BvayypZACa?dl=0

>>>>>>> 059697bcef6b2ef81acfcbd9ba111056b9bde179
>
    dialogue/
    └── moviebot_data/
        ├── data.bin
        ├── memory.pth
        ├── movie_conversations.txt
        ├── movie_lines.tsv
    
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


