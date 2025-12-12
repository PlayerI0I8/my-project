FROM php:8.1-apache

# เปิดใช้งาน extension MySQL
RUN docker-php-ext-install mysqli pdo pdo_mysql

# เปิด mod_rewrite (เผื่อใช้ Framework ในอนาคต)
RUN a2enmod rewrite

WORKDIR /var/www/html
EXPOSE 80