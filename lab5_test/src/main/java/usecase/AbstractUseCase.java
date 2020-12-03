package usecase;

public abstract class AbstractUseCase<I, O> 
{
	
	public AbstractUseCase() {}

	public abstract O execute(I input);
}
