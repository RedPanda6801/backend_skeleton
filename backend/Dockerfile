FROM node:16.16.0

# set locale
RUN apt-get update \
    && apt-get install -y vim \
    && apt-get install -y locales
RUN sed -i 's/^# \(ko_KR.UTF-8\)/\1/' /etc/locale.gen
RUN localedef -f UTF-8 -i ko_KR ko_KR.UTF-8
ENV LC_ALL ko_KR.UTF-8

RUN mkdir -p /home/www
COPY . /home/www
WORKDIR /home/www

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]