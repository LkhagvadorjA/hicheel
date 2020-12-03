package com.example.demo.controller;

import java.util.List;

import org.apache.tomcat.util.buf.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.RestEntity;
import com.example.demo.jdbc.BookRepository;
import com.example.demo.transferObject.Book;

import usecase.book.DeleteSubscriptionByBookId;
import usecase.book.GetBookByUserId;
import usecase.book.GetSubscribedBook;
import usecase.book.SetBookByUserIdAndUserName;
import usecase.book.SubscribeBookByUserId;
import usecase.getBooksByState.GetBooksByState;



@RestController
@CrossOrigin
@RequestMapping(value = "book", name = "Provides BPM case APIs.")
public class BookRestApi {
	
	@Autowired BookRepository bookRepository;

	@GetMapping("/{state}")
	@ResponseBody
	public RestEntity getBooksByState(@PathVariable String state)
	{
		GetBooksByState getBooksByState = new GetBooksByState(bookRepository);
		List<Book> books = getBooksByState.execute(state);
		return new RestEntity(books);
	}
	
	@GetMapping("/user-id/{userId}")
	@ResponseBody
	public RestEntity getBookByUserId(@PathVariable String userId)
	{
		if (!org.springframework.util.StringUtils.isEmpty(userId))
		{
			GetBookByUserId getBookByUserId = new GetBookByUserId(bookRepository);
			List<Book> books = getBookByUserId.execute(userId);
			return new RestEntity(books);
		}
		return new RestEntity(null);
	}
	
	@PostMapping("/set-book")
	public RestEntity setBookByState(@RequestBody Book restBook)
	{
		if( null != restBook )
		{
			SetBookByUserIdAndUserName setBookByUserIdAndUserName = new SetBookByUserIdAndUserName(bookRepository);
			boolean updated = setBookByUserIdAndUserName.execute(restBook);
			return new RestEntity(updated);
		}
		return new RestEntity(null);
	}
	
	@PostMapping("/subscribe")
	public RestEntity subscribeByUserId(@RequestBody Book restBook)
	{
		if( null != restBook )
		{
			SubscribeBookByUserId subscribeBookByUserId = new SubscribeBookByUserId(bookRepository); 
			boolean updated = subscribeBookByUserId.execute(restBook);
			return new RestEntity(updated);
		}
		return new RestEntity(null);
	}
	
	@PostMapping("/subscribeBook")
	public RestEntity subscribeBook(@RequestBody Book restBook)
	{
		if( null != restBook )
		{
			return new RestEntity(true);
		}
		return new RestEntity(null);
	}
	
	@GetMapping("/subscribedBook/{userId}")
	@ResponseBody
	public RestEntity getSubscribedBookByUserId(@PathVariable String userId)
	{
		GetSubscribedBook getSubscribedBook = new GetSubscribedBook(bookRepository);
		return new RestEntity( getSubscribedBook.execute(userId) );
	}
	
	@PostMapping("/delete/subscription/{bookId}")
	public RestEntity deleteSubscriptionByBookId(@PathVariable String bookId)
	{
		if (null != bookId)
		{
			DeleteSubscriptionByBookId deleteSubscriptionByBookId = new DeleteSubscriptionByBookId(bookRepository);
			boolean deleted = deleteSubscriptionByBookId.execute(bookId);
			return new RestEntity(deleted);
		}
		return new RestEntity(false);
	}
}
