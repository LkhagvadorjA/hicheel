drop table user_info;
create table user_info(
id int,	
first_name varchar(255),
last_name varchar(255),
password varchar(255)
);

insert into user_info(id, first_name, last_name, password)
values (1, 'Bat-Erdene', 'Bat', '123'), (2, 'Zorig', 'Amar', '123');