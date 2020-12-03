package usecase.book;

import com.example.demo.jdbc.BookRepository;

import usecase.AbstractUseCase;

public class DeleteSubscriptionByBookId extends AbstractUseCase<String, Boolean> {
	private final BookRepository bookRepository;
	
	public DeleteSubscriptionByBookId(BookRepository bookRepository) {
		super();
		this.bookRepository = bookRepository;
	}

	@Override
	public Boolean execute(String input) {
		int deleted = bookRepository.deleteSubscriptionByBookId(input);
		return deleted == 1;
	}

}
