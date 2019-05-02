# Download Data

if [ -d "dialogue/stackbot_data/" ]; then
    echo "The data had been already downloaded"
else
    mkdir dialogue/stackbot_data/
    
    curl -L https://www.dropbox.com/sh/qxibis9vw30htvw/AAC_UAkJ2k5dfHbshiwTeMnMa?dl=1 > dialogue/moviebot_data/download1.zip
    unzip dialogue/moviebot_data/download1.zip -d dialogue/moviebot_data
    rm dialogue/moviebot_data/download1.zip
    curl -L https://www.dropbox.com/sh/ffb8ohnb0j7cb15/AACDKNel7WVK0nGo5M6lm1Jfa?dl=1 > dialogue/stackbot_data/download2.zip
    unzip dialogue/stackbot_data/download2.zip -d dialogue/stackbot_data
    rm dialogue/stackbot_data/download2.zip
fi

# Docker compose
docker-compose up -d

wait

# npm
pushd frontend/
# Download Data

if [ -d "node_modules/" ]; then
    echo "The node_modules have been installed"
else
    npm install
    npm audit fix
fi
npm start

