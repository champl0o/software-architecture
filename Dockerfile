FROM ruby:3.0.0
RUN apt-get update -qq \
&& apt-get install -y curl build-essential libpq-dev \
 nodejs postgresql-client &&\
  curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y nodejs yarn

ADD . /app
WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN gem install bundler
RUN bundle install --jobs 20 --retry 5

COPY package.json yarn.lock ./
RUN yarn --pure-lockfile --force

COPY . .
RUN yarn build

EXPOSE 3000
CMD ["bash"]
