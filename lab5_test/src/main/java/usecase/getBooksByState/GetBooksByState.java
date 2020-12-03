package usecase.getBooksByState;

import java.util.List;

import com.example.demo.jdbc.BookRepository;
import com.example.demo.transferObject.Book;

import usecase.AbstractUseCase;

public class GetBooksByState extends AbstractUseCase<String, List<Book>> {

	private BookRepository bookRepository;
	
	public GetBooksByState(BookRepository bookRepository)
	{
		this.bookRepository = bookRepository;
	}
	
	@Override
	public List<Book> execute(String input) {
		return bookRepository.getBooksByState(input);
	}

}
