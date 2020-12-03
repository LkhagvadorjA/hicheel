package com.example.demo.jdbc;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.transferObject.Book;

public interface BookRepository extends CrudRepository<Book, Long>{
	@Query("SELECT * from library where book_state = :state")
	List<Book> getBooksByState(@Param("state") String state);
	
	@Query("SELECT * from library WHERE borrower_id = :borrowerId")
	List<Book> getBookByUserId(@Param("borrowerId") String borrowerId);
	
	@Query("SELECT * FROM library WHERE book_id = :bookId and book_state = :state")
	Book getBookByBookIdAndState(@Param("bookId") String bookId, @Param("state") String state);
	
	@Modifying
	@Query("UPDATE library SET borrower_id = :borrowerId, borrower_name = :borrowerName, book_state = :bookState WHERE book_id = :bookId")
	int setBookByUserIdAndName(@Param("borrowerId") String borrowerId, @Param("borrowerName") String borrowerName, 
								@Param("bookId") String bookId, @Param("bookState") String bookSate);
	
	@Query("SELECT * FROM subscription WHERE book_id = :bookId")
	List<Book> getByBookIdFromSubscription(@Param("bookId") String bookId);
	
	@Query("SELECT TOP (1) * FROM subscription WHERE borrower_id = :borrowerId")
	Book getByUserIdFromSubscription(@Param("borrowerId") String borrowerId);
	
	
	@Modifying
	@Query("INSERT INTO subscription (book_id, borrower_id) VALUES(:bookId, :borrowerId)")
	int insertSubscriber(@Param("bookId") String bookId, @Param("borrowerId") String borrowerId);
	
	@Modifying
	@Query("DELETE FROM subscription WHERE book_id = :bookId")
	int deleteSubscriptionByBookId(@Param("bookId") String bookId);
}
