package usecase.book;

import com.example.demo.jdbc.BookRepository;
import com.example.demo.transferObject.Book;

import usecase.AbstractUseCase;

public class SetBookByUserIdAndUserName extends AbstractUseCase<Book, Boolean> {

	private BookRepository bookRepository;
	
	public SetBookByUserIdAndUserName(BookRepository bookRepository)
	{
		this.bookRepository = bookRepository;
	}
	@Override
	public Boolean execute(Book input) {
		if ( null != input )
		{
			return bookRepository.setBookByUserIdAndName(input.getBorrowerId(), input.getBorrowerName(), input.getBookId(), input.getBookState()) == 1;
		}
		return false;
	}

}
