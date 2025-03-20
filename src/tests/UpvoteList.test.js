import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UpvoteList } from '../components/UpvoteList'; // Adjust the import path as necessary

describe('checking if UpvoteList exist', () => {
  render(<UpvoteList />);
  it('should reder normally', async () => {
    //Reendering the container
      // check if the buttons: "Add Container" and "Reset All" are rendered
      expect(screen.getByText('Add Container')).toBeInTheDocument();
      expect(screen.getByText('Reset All')).toBeInTheDocument();

      // check if the fist container exist
      expect(screen.getByTestId('container-1')).toBeInTheDocument();

    //Checking containers
      // Check if the fist cintainer contain the id 1
      expect(screen.getByTestId('container-1')).toBeInTheDocument();

    //Shoul add a new container after click in the button
      const addContainerButton = screen.getByText('Add Container');
      fireEvent.click(addContainerButton);

      // check if the container was perfectly add
      expect(screen.getByTestId('container-2')).toBeInTheDocument();

    // "Reset All" button functionality
      const resetButton = screen.getByText('Reset All');
      fireEvent.click(resetButton);

      // Check if the container has been reset
      expect(screen.queryByTestId('container-2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('container-3')).not.toBeInTheDocument();

    // Container selection when clicking the "+" button (Add Upvote)
      const addUpvoteButton = screen.getByText('+');
      fireEvent.click(addUpvoteButton);

      const addUpvoteSelected = screen.getByTestId('upvote-icon');;
      fireEvent.click(addUpvoteSelected); 

      const container = screen.getByTestId('container-1');
      expect(container.classList).toContain('selected');

    // Uncheck when there are no upvotes
      fireEvent.click(addUpvoteButton);  // Add upvote
      fireEvent.click(addUpvoteSelected); 
      const removeUpvoteButton = screen.getByText('-');
      fireEvent.click(removeUpvoteButton);  // Remove upvote

      // check if it was deseleted 
      expect(screen.getByTestId('container-1').classList).not.toContain('selected');

    //Add an Upvote
      fireEvent.click(resetButton);
      fireEvent.click(addUpvoteButton);

      // Check if the number of upvotes was updated
      expect(screen.getByTestId('container-1')).toHaveTextContent('Upvotes: 1')

    //Remove an upvote
      fireEvent.click(resetButton);
      fireEvent.click(addUpvoteButton)
      fireEvent.click(removeUpvoteButton);

      // Check if the number was decreased
      expect(screen.getByTestId('container-1')).toHaveTextContent('Upvotes: 0');

    // Check multiples containers 
      // Add one more container
      fireEvent.click(addContainerButton);

      // Add an upvote in the firt container
      // Using getByText to find the button "+"
      const addUpvoteButton1 = screen.getAllByText('+')[0];  // first button "+"
      fireEvent.click(addUpvoteButton1);

      // Add upvote in the second container
      const addUpvoteButton2 = screen.getAllByText('+')[1];  // Second button "+"
      fireEvent.click(addUpvoteButton2);

      // Wait the number of upvotes to the inicialized
      await waitFor(() => {
        expect(screen.getByTestId('container-1')).toHaveTextContent('Upvotes: 1');
      });
      await waitFor(() => {
        expect(screen.getByTestId('container-2')).toHaveTextContent('Upvotes: 1');
      });

    // Change the state in the localStorage
      fireEvent.click(resetButton); // reset all containers
      fireEvent.click(addUpvoteButton);  // add a upvote
      // check if the localStorage was updated with the new state
      const containers = JSON.parse(localStorage.getItem('containers'));
      expect(containers[0].upvotes.length).toBe(1);
    
    // Comportamento esperado após reset do localStorage
      fireEvent.click(resetButton); // reset containers
      // check if the localStorage was resetted 
      expect(containers.length).toBe(1);  // Only one content should exist
  });
});
