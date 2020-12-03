package com.example.demo.transferObject;

public class Book {
	private String bookId;
	private String bookName;
	private String bookState;
	private String borrowerId;
	private String borrowerName;
	public Book(String bookId, String bookName, String bookState, String borrowerId, String borrowerName) {
		super();
		this.bookId = bookId;
		this.bookName = bookName;
		this.bookState = bookState;
		this.borrowerId = borrowerId;
		this.borrowerName = borrowerName;
	}
	public String getBookId() {
		return bookId;
	}
	public void setBookId(String bookId) {
		this.bookId = bookId;
	}
	public String getBookName() {
		return bookName;
	}
	public void setBookName(String bookName) {
		this.bookName = bookName;
	}
	public String getBookState() {
		return bookState;
	}
	public void setBookState(String bookState) {
		this.bookState = bookState;
	}
	public String getBorrowerId() {
		return borrowerId;
	}
	public void setBorrowerId(String borrowerId) {
		this.borrowerId = borrowerId;
	}
	public String getBorrowerName() {
		return borrowerName;
	}
	public void setBorrowerName(String borrowerName) {
		this.borrowerName = borrowerName;
	}
}
