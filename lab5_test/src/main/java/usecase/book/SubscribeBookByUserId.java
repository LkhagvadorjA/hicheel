package usecase.book;

import java.util.List;

import com.example.demo.jdbc.BookRepository;
import com.example.demo.transferObject.Book;

import usecase.AbstractUseCase;

public class SubscribeBookByUserId extends AbstractUseCase<Book, Boolean> {

	private final BookRepository bookRepository;
	
	public SubscribeBookByUserId(BookRepository bookRepository)
	{
		this.bookRepository = bookRepository;
	}
	
	@Override
	public Boolean execute(Book input) {
		String bookId = input.getBookId();
		String userId = input.getBorrowerId();
		List<Book> subscribedBook = bookRepository.getByBookIdFromSubscription(bookId);
		if (null == subscribedBook || 0 == subscribedBook.size())
		{
			int isUpdated = bookRepository.insertSubscriber(bookId, userId);
			return isUpdated == 1 ? true : null;
		}
		return false;
	}

}
