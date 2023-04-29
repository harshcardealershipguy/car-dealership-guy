#this docker file is used for production

FROM php:8.1-fpm

ENV APP_ENV=prod

RUN apt-get update && apt-get install -y  \
    procps \
    npm \
    libpq-dev \
    git \
    cron \
    libpng-dev \
    zlib1g-dev  \
    libjpeg62-turbo-dev \
    libwebp-dev \
    libfreetype6-dev \
    libpng-dev \
    --no-install-recommends

RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) gd

COPY php.ini /usr/local/etc/php/conf.d/php.ini

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/backend/

COPY composer.json composer.lock /var/www/backend/

RUN set -eux; \
    mkdir -p storage/logs storage/framework bootstrap/cache; \
    composer install --prefer-dist --no-progress --no-suggest --no-autoloader --no-scripts --no-dev;  \
    composer clear-cache

COPY . /var/www/backend/

RUN composer dump-autoload --no-dev --optimize

RUN chown -R www-data:www-data /var/www
USER www-data




