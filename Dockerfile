FROM mcr.microsoft.com/playwright

WORKDIR /usr/src/app

COPY . .

#RUN npm ci
RUN apt-get update
#RUN apt-get install wget

# Install Chrome.
#RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
#RUN sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
#RUN apt-get update
#RUN apt-get install -y google-chrome-stable

RUN npx playwright install
RUN npm ci

