FROM python:3.6
ENV PYTHONUNBUFFERED 1

RUN mkdir /webapps
WORKDIR /webapps
COPY . /webapps

RUN pip install -r requirements.txt

EXPOSE 8000