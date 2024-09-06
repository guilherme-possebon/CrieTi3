create database crieti

create table produto (
    id serial,
    nome varchar(250) not null,
    valor numeric(10,2) null default null
);

insert into produto (nome, valor) values('Bola quadrada', 89.56) returning id;
insert into produto (nome, valor) values('Bola redonda', 15.56) returning id;
