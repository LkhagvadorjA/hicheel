package usecase.book;

import com.example.demo.jdbc.BookRepository;
import com.example.demo.transferObject.Book;

import usecase.AbstractUseCase;

public class GetSubscribedBook extends AbstractUseCase<String, Book>{

	private final BookRepository bookRepository;
	
	public GetSubscribedBook(BookRepository bookRepository) {
		super();
		this.bookRepository = bookRepository;
	}



	@Override
	public Book execute(String input) {
		Book subscription = bookRepository.getByUserIdFromSubscription(input);
		if (null != subscription )
		{
			Book book = bookRepository.getBookByBookIdAndState(subscription.getBookId(), "OPEN");
			return book;
		}
		return null;
	}

}
