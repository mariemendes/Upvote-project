import { Button } from './Button';
import { UpvoteItem } from './UpvoteItem';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function UpvoteList() {
  // Using the custom hook to manage state with localStorage
  const [containers, setContainers] = useLocalStorage('containers', [
    { id: 1, upvotes: [], isSelected: false },
  ]);

  // Função para verificar e resetar isSelected quando necessário
  function checkAndResetSelection(containerId) {
    setContainers(prevContainers =>
      prevContainers.map(container =>
        container.id === containerId && container.upvotes.length === 0
          ? { ...container, isSelected: false }
          : container
      )
    );
  }

  // Function to toggle the selection of upvotes in a specific container
  function toggleUpvotes(containerId) {
    setContainers(prevContainers => 
      prevContainers.map(container => 
        container.id === containerId
          ? { ...container, isSelected: !container.isSelected }
          : container
      )
    );
  }

  // Function to add a new upvote to the container
  function addUpvote(containerId) {
    setContainers(prevContainers =>
      prevContainers.map(container =>
        container.id === containerId
          ? { ...container, upvotes: [...container.upvotes, container.upvotes.length] }
          : container
      )
    );
  }

  // Function to remove one upvote from the container
  function removeUpvote(containerId) {
    setContainers(prevContainers =>
      prevContainers.map(container =>
        container.id === containerId
          ? { ...container, upvotes: container.upvotes.slice(0, -1) } // Remove the last upvote
          : container
      )
    );
    checkAndResetSelection(containerId); // Verifica se deve resetar a seleção após remover upvote
  }

  // Function to add a new container
  function addContainer() {
    const newContainer = { id: containers.length + 1, upvotes: [], isSelected: false };
    setContainers(prevContainers => [...prevContainers, newContainer]);
  }

  // Function to reset everything in localStorage
  function resetLocalStorage() {
    setContainers([{ id: 1, upvotes: [], isSelected: false }]); // Resetting the state
  }

  return (
    <div className="container">
      {containers.map(container => (
        <div key={container.id} className={`itemList ${container.isSelected ? 'selected' : ''}`} data-testid={`container-${container.id}`}>
          {/* Upvotes container with + and - buttons */}
          <UpvoteItem
            upvotes={container.upvotes}
            isSelected={container.isSelected}
            toggleUpvotes={() => toggleUpvotes(container.id)}
          />
          <p style={{ display: 'none' }}>Upvotes: {container.upvotes.length}</p> 
          <div className="buttonsContainer">
            <Button onClick={() => addUpvote(container.id)} data-testid="add-upvote-button" className={"addUpvoteButton"} buttonText={"+"} />
            <Button onClick={() => removeUpvote(container.id)} className={"removeUpvoteButton"} buttonText={"-"} />
          </div>  
        </div>
      ))}

      <Button onClick={addContainer} className={"addContainerButton"} buttonText={"Add Container"} />
      <Button onClick={resetLocalStorage} className={"resetContainers"} buttonText={"Reset All"} />
    </div>
  );
}
