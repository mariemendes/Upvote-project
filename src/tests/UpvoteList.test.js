import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UpvoteList } from '../components/UpvoteList'; // Adjust the import path as necessary

describe('checking if UpvoteList exist', () => {
  render(<UpvoteList />);
  it('should reder normally', async () => {
    //1)Renderização inicial do componente
    // Verifica se o botão "Add Container" e "Reset All" são renderizados
    expect(screen.getByText('Add Container')).toBeInTheDocument();
    expect(screen.getByText('Reset All')).toBeInTheDocument();

    // Verifica se o primeiro container (com id 1) é renderizado
    expect(screen.getByTestId('container-1')).toBeInTheDocument();

    //2)Verificação de containers
    // Verifica se o container com id 1 está na tela
    expect(screen.getByTestId('container-1')).toBeInTheDocument();

    //3)deve adicionar um novo container ao clicar em "Add Container"
    const addContainerButton = screen.getByText('Add Container');
    fireEvent.click(addContainerButton);

    // Verifica se o novo container foi adicionado
    expect(screen.getByTestId('container-2')).toBeInTheDocument();

    // 4)Funcionalidade do botão "Reset All"
    const resetButton = screen.getByText('Reset All');
    fireEvent.click(resetButton);

    // Verifica se o container foi resetado
    expect(screen.queryByTestId('container-2')).not.toBeInTheDocument();
    expect(screen.queryByTestId('container-3')).not.toBeInTheDocument();

    // 5. Seleção de container ao clicar no botão "+" (Add Upvote)
    const addUpvoteButton = screen.getByText('+');
    fireEvent.click(addUpvoteButton);

    const addUpvoteSelected = screen.getByTestId('upvote-icon');;
    fireEvent.click(addUpvoteSelected); 

    const container = screen.getByTestId('container-1');
    expect(container.classList).toContain('selected');

    //6 - Desmarcação de seleção quando não houver upvotes
    fireEvent.click(addUpvoteButton);  // Adiciona um upvote
    fireEvent.click(addUpvoteSelected); 
    const removeUpvoteButton = screen.getByText('-');
    fireEvent.click(removeUpvoteButton);  // Remove o upvote

    // Verifica se a seleção foi removida
    expect(screen.getByTestId('container-1').classList).not.toContain('selected');

    //7 - Adição de upvote
    fireEvent.click(resetButton);
    fireEvent.click(addUpvoteButton);  // Adiciona o primeiro upvote

    // Verifica se o número de upvotes no container foi atualizado
    expect(screen.getByTestId('container-1')).toHaveTextContent('Upvotes: 1')

    //8 - Remoção de upvote
    fireEvent.click(resetButton);
    fireEvent.click(addUpvoteButton)
    fireEvent.click(removeUpvoteButton);

    // Verifica se o número de upvotes foi decrementado
    expect(screen.getByTestId('container-1')).toHaveTextContent('Upvotes: 0');

    // 9. Verificação de múltiplos containers
    // Adiciona dois containers
    fireEvent.click(addContainerButton);

   // Adiciona upvote no primeiro container
    // Usando getByText para encontrar o botão "+"
    const addUpvoteButton1 = screen.getAllByText('+')[0];  // O primeiro botão "+"
    fireEvent.click(addUpvoteButton1);

    // Adiciona upvote no segundo container
    const addUpvoteButton2 = screen.getAllByText('+')[1];  // O segundo botão "+"
    fireEvent.click(addUpvoteButton2);

    // Espera a atualização do número de upvotes no container
    await waitFor(() => {
      expect(screen.getByTestId('container-1')).toHaveTextContent('Upvotes: 1');
    });
    await waitFor(() => {
      expect(screen.getByTestId('container-2')).toHaveTextContent('Upvotes: 1');
    });

    // 10. Alteração do estado no localStorage
    fireEvent.click(resetButton); // reset containers
    fireEvent.click(addUpvoteButton);  // Adiciona o primeiro upvote
    // Verifica se o localStorage foi atualizado com o novo estado
    const containers = JSON.parse(localStorage.getItem('containers'));
    expect(containers[0].upvotes.length).toBe(1);
    
    // 11. Comportamento esperado após reset do localStorage
    fireEvent.click(resetButton); // reset containers
    // Verifica se o estado no localStorage foi resetado
    expect(containers.length).toBe(1);  // Apenas um container deve existir
  });
});
