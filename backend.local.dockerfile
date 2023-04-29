FROM php:8.1-fpm

ENV APP_ENV=local

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

COPY backend/php.ini /usr/local/etc/php/conf.d/php.ini

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer