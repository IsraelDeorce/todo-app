import userEvent from '@testing-library/user-event';
import { screen, within } from '@testing-library/react';

import { renderWithRematchStore } from '../utils/testUtils';
import App from '../App';

describe('App', () => {
  it('adds a task when user adds a description and clicks on the "Add task" button', () => {
    renderWithRematchStore({ ui: <App /> });
    const taskInput: HTMLInputElement = screen.getByPlaceholderText('Type to add new tasks');
    const taskButton: HTMLButtonElement = screen.getByText('Add task');
    userEvent.type(taskInput, 'Lorem Ipsum');
    userEvent.click(taskButton);
    const taskList: HTMLDivElement = screen.getByTestId('task-list');
    expect(within(taskList).getByText('Lorem Ipsum')).toBeInTheDocument();
  });

  it('adds a task when user adds a description and press ENTER', () => {
    renderWithRematchStore({ ui: <App /> });
    const taskInput: HTMLInputElement = screen.getByPlaceholderText('Type to add new tasks');
    userEvent.type(taskInput, 'Lorem Ipsum');
    userEvent.keyboard('{enter}');
    const taskList: HTMLDivElement = screen.getByTestId('task-list');
    expect(within(taskList).getByText('Lorem Ipsum')).toBeInTheDocument();
  });

  it('does not add a task when user does not add a description and clicks on the "Add task" button', () => {
    renderWithRematchStore({ ui: <App /> });
    const taskButton: HTMLButtonElement = screen.getByText('Add task');
    userEvent.click(taskButton);
    const taskList: HTMLDivElement = screen.getByTestId('task-list');
    expect(taskList).toBeEmptyDOMElement();
  });

  it('does not add a task when user does not add a description and press ENTER', () => {
    renderWithRematchStore({ ui: <App /> });
    const taskInput: HTMLInputElement = screen.getByPlaceholderText('Type to add new tasks');
    userEvent.click(taskInput);
    userEvent.keyboard('{enter}');
    const taskList: HTMLDivElement = screen.getByTestId('task-list');
    expect(taskList).toBeEmptyDOMElement();
  });

  describe('Manage added tasks', () => {
    let mockStates = {
      todoList: { idCount: 0, isHidingTasks: false, tasks: [{}] },
    };

    beforeEach(() => {
      mockStates = {
        todoList: {
          idCount: 3,
          tasks: [
            { id: 1, description: 'Mock task 1', isComplete: false },
            { id: 2, description: 'Mock task 2', isComplete: true },
            { id: 3, description: 'Mock task 3', isComplete: false },
            { id: 4, description: 'Mock task 4', isComplete: true },
          ],
          isHidingTasks: false,
        },
      };
    });

    it('completes a task when the user clicks on the unmarked task checkbox', () => {
      renderWithRematchStore({ ui: <App />, mockStates });
      const task: HTMLDivElement = screen.getByTestId('task-1');
      const taskCheckbox: HTMLInputElement = within(task).getByRole('checkbox');
      userEvent.click(taskCheckbox);
      expect(taskCheckbox.checked).toBe(true);   
    });
  
    it('undo a task when the user clicks on the marked task checkbox', () => {
      renderWithRematchStore({ ui: <App />, mockStates });
      const task: HTMLDivElement = screen.getByTestId('task-2');
      const taskCheckbox: HTMLInputElement = within(task).getByRole('checkbox');
      userEvent.click(taskCheckbox);
      expect(taskCheckbox.checked).toBe(false);
    });
  
    it('hides completed tasks when the user clicks on the unmarked "hide tasks" checkbox', () => {
      mockStates.todoList.isHidingTasks = false;
      renderWithRematchStore({ ui: <App />, mockStates });
      const hideCheckbox: HTMLInputElement = screen.getByRole('checkbox', { name: 'Hide Completed Tasks' });
      userEvent.click(hideCheckbox);
      expect(hideCheckbox.checked).toBe(true);
      expect(screen.queryByTestId('task-2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('task-4')).not.toBeInTheDocument();
    });
  
    it('shows completed tasks when the user clicks on the marked "hide tasks" checkbox', () => {
      mockStates.todoList.isHidingTasks = true;
      renderWithRematchStore({ ui: <App />, mockStates });
      const hideCheckbox: HTMLInputElement = screen.getByRole('checkbox', { name: 'Hide Completed Tasks' });
      userEvent.click(hideCheckbox);
      expect(hideCheckbox.checked).toBe(false);
      expect(screen.getByTestId('task-2')).toBeInTheDocument();
      expect(screen.getByTestId('task-4')).toBeInTheDocument();
    });
  
    it('deletes a task when the X icon is pressed', () => {
      renderWithRematchStore({ ui: <App />, mockStates });
      const task: HTMLDivElement = screen.getByTestId('task-1');
      const deleteIcon = within(task).getByRole('application');
      userEvent.click(deleteIcon);
      expect(screen.queryByTestId('task-1')).not.toBeInTheDocument();
    });
  });
});
