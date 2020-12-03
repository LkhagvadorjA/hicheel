create table library(
 id int,
 book_name varchar(255),
 book_state varchar(255),
 borrower_id varchar(255),
 borrower_name varchar(255),
 request_id varchar(255),
 primary key(id)
);


update library set book_state = 'OPEN', borrower_id = '', borrower_name = '';

create table subscription (
	book_id varchar(25),
	borrower_id varchar(25),
	primary key (book_id)
);

INSERT INTO subscription (book_id, borrower_id) VALUES('book1', 'user1');
  
DELETE FROM subscription