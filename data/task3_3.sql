-- TODO Task 3
drop database if exists csfassesment;
create database csfassesment;
use csfassesment;

create table orders (
   orderId varchar(64) not null,
   date timestamp default current_timestamp not null,
   name varchar(128) not null,
   address varchar(128) not null,
   priority text,
   comments text,

   primary key(orderId)
);

create table cart ( 
   id int auto_increment,
   productId varchar(128) not null,
   orderId varchar(128) not null,
   name varchar(128) not null,
   quantity int not null,
   price int not null,
   
   primary key(id),
   foreign key (orderId) references orders(orderId)
);

grant all privileges on csfassesment.* to celine@'%';

flush privileges;