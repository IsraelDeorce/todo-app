import userEvent from '@testing-library/user-event';
import { screen, within } from '@testing-library/react';

import { renderWithRematchStore } from './utils/testUtils';
import App from './App';

describe('App', () => {
  it('adds a task when user adds a description and clicks on the "Add task" button', () => {
    renderWithRematchStore(<App />);
    const taskInput: HTMLInputElement = screen.getByPlaceholderText('Type to add new tasks');
    const taskButton: HTMLButtonElement = screen.getByText('Add task');
    userEvent.type(taskInput, 'Lorem Ipsum');
    userEvent.click(taskButton);
    const taskList: HTMLDivElement = screen.getByTestId('task-list')
    expect(within(taskList).getByText('Lorem Ipsum')).toBeInTheDocument();
  });

  it('adds a task when user adds a description and press ENTER', () => {
    renderWithRematchStore(<App />);
    const taskInput: HTMLInputElement = screen.getByPlaceholderText('Type to add new tasks');
    userEvent.type(taskInput, 'Lorem Ipsum');
    userEvent.keyboard('{enter}');
    const taskList: HTMLDivElement = screen.getByTestId('task-list')
    expect(within(taskList).getByText('Lorem Ipsum')).toBeInTheDocument();
  });

  it('does not add a task when user does not add a description and clicks on the "Add task" button', () => {
    renderWithRematchStore(<App />);
    const taskButton: HTMLButtonElement = screen.getByText('Add task');
    userEvent.click(taskButton);
    const taskList: HTMLDivElement = screen.getByTestId('task-list');
    expect(taskList).toBeEmptyDOMElement();
  });

  it('does not add a task when user does not add a description and press ENTER', () => {
    renderWithRematchStore(<App />);
    const taskInput: HTMLInputElement = screen.getByPlaceholderText('Type to add new tasks');
    userEvent.click(taskInput);
    userEvent.keyboard('{enter}');
    const taskList: HTMLDivElement = screen.getByTestId('task-list');
    expect(taskList).toBeEmptyDOMElement();
  });

  // it('completes a task when the user clicks on the unmarked task checkbox', () => {
    
  // });

//   it('undo a task when the user clicks on the marked task checkbox', () => {
//     expect(true).toBe(false);
//   });

//   it('hides all completed tasks when the user clicks on the unmarked "hide tasks" checkbox', () => {
//     expect(true).toBe(false);
//   });

//   it('unhides all completed tasks when the user clicks on the "hide tasks" checkbox', () => {
//     expect(true).toBe(false);
//   });

//   it('deletes a task when the X icon is pressed', () => {
//     expect(true).toBe(false);
//   });
})
