package usecase.book;

import java.util.List;

import com.example.demo.jdbc.BookRepository;
import com.example.demo.transferObject.Book;

import usecase.AbstractUseCase;

public class GetBookByUserId extends AbstractUseCase<String, List<Book>> {
	private BookRepository bookRepository;

	public GetBookByUserId(BookRepository bookRepository)
	{
		this.bookRepository = bookRepository;
	}
	
	@Override
	public List<Book> execute(String input) {
		return this.bookRepository.getBookByUserId(input);
	}
}
