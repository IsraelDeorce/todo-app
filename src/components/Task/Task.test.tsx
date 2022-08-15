import { screen } from '@testing-library/react';

import { renderWithRematchStore } from '../../utils/testUtils';
import Task from './Task';

describe('Task', () => {
  it('renders the task checkbox checked when task in complete', () => {
    renderWithRematchStore({ ui: <Task id={123} description="Lorem Ipsum" isComplete /> });
    const taskCheckbox: HTMLInputElement = screen.getByRole('checkbox');
    expect(taskCheckbox.checked).toEqual(true);
  });

  it('renders the task checkbox not checked when task in not complete', () => {
    renderWithRematchStore({ ui: <Task id={123} description="Lorem Ipsum" isComplete={false} /> });
    const taskCheckbox: HTMLInputElement = screen.getByRole('checkbox');
    expect(taskCheckbox.checked).toEqual(false);
  });

  it('renders the correct description without complete style when task is not complete', () => {
    const description = 'Lorem Ipsum';
    renderWithRematchStore({ ui: <Task id={123} description={description} isComplete={false} /> });
    const p: HTMLParagraphElement = screen.getByText(description);
    expect(p).toHaveTextContent(description);
    expect(p).not.toHaveClass('task-complete');
  });

  it('renders the correct description styled when task is complete', () => {
    const description = 'Lorem Ipsum';
    renderWithRematchStore({ ui: <Task id={123} description={description} isComplete /> });
    const p: HTMLParagraphElement = screen.getByText(description);
    expect(p).toHaveTextContent(description);
    expect(p).toHaveClass('task-complete');
  });
});
