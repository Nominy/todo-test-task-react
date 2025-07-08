import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('Todo App', () => {
  describe('Adding todos', () => {
    it('should add a new todo when form is submitted', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const input = screen.getByPlaceholderText('What needs to be done?');
      
      await user.type(input, 'Learn React');
      await user.keyboard('{Enter}');
      
      expect(screen.getByText('Learn React')).toBeInTheDocument();
      expect(input).toHaveValue('');
    });

    it('should not add empty todos', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const input = screen.getByPlaceholderText('What needs to be done?');
      
      await user.type(input, '   ');
      await user.keyboard('{Enter}');
      
      expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    });

    it('should trim whitespace from todos', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const input = screen.getByPlaceholderText('What needs to be done?');
      
      await user.type(input, '  Learn React  ');
      await user.keyboard('{Enter}');
      
      expect(screen.getByText('Learn React')).toBeInTheDocument();
    });
  });

  describe('Toggle todos', () => {
    it('should toggle todo completion status', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const input = screen.getByPlaceholderText('What needs to be done?');
      await user.type(input, 'Learn React');
      await user.keyboard('{Enter}');
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
      
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
      
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('should update the active count when toggling todos', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const input = screen.getByPlaceholderText('What needs to be done?');
      await user.type(input, 'Learn React');
      await user.keyboard('{Enter}');
      await user.type(input, 'Learn TypeScript');
      await user.keyboard('{Enter}');
      
      expect(screen.getByText('2 items left')).toBeInTheDocument();
      
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[0]);
      
      expect(screen.getByText('1 item left')).toBeInTheDocument();
    });
  });

  describe('Delete todos', () => {
    it('should delete a todo when delete button is clicked', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const input = screen.getByPlaceholderText('What needs to be done?');
      await user.type(input, 'Learn React');
      await user.keyboard('{Enter}');
      
      const todoItem = screen.getByText('Learn React').closest('.todo-item');
      expect(todoItem).toBeInTheDocument();
      
      // Hover to show delete button
      fireEvent.mouseEnter(todoItem!);
      
      const deleteButton = screen.getByLabelText('Delete todo');
      await user.click(deleteButton);
      
      expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
      expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    });
  });

  describe('Filter todos', () => {
    it('should filter todos by All/Active/Completed', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const input = screen.getByPlaceholderText('What needs to be done?');
      
      await user.type(input, 'Active todo');
      await user.keyboard('{Enter}');
      await user.type(input, 'Completed todo');
      await user.keyboard('{Enter}');
      
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[1]);
      
      expect(screen.getByText('Active todo')).toBeInTheDocument();
      expect(screen.getByText('Completed todo')).toBeInTheDocument();
      
      const activeButton = screen.getByText('Active');
      await user.click(activeButton);
      expect(screen.getByText('Active todo')).toBeInTheDocument();
      expect(screen.queryByText('Completed todo')).not.toBeInTheDocument();
      
      const completedButton = screen.getByText('Completed');
      await user.click(completedButton);
      expect(screen.queryByText('Active todo')).not.toBeInTheDocument();
      expect(screen.getByText('Completed todo')).toBeInTheDocument();
      
      const allButton = screen.getByText('All');
      await user.click(allButton);
      expect(screen.getByText('Active todo')).toBeInTheDocument();
      expect(screen.getByText('Completed todo')).toBeInTheDocument();
    });

    it('should highlight the active filter', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const allButton = screen.getByText('All');
      const activeButton = screen.getByText('Active');
      
      expect(allButton).toHaveClass('active');
      expect(activeButton).not.toHaveClass('active');
      
      await user.click(activeButton);
      
      expect(allButton).not.toHaveClass('active');
      expect(activeButton).toHaveClass('active');
    });
  });

  describe('Clear completed', () => {
    it('should clear all completed todos', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const input = screen.getByPlaceholderText('What needs to be done?');
      
      await user.type(input, 'Todo 1');
      await user.keyboard('{Enter}');
      await user.type(input, 'Todo 2');
      await user.keyboard('{Enter}');
      await user.type(input, 'Todo 3');
      await user.keyboard('{Enter}');
      
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[0]);
      await user.click(checkboxes[2]);
      
      expect(screen.getByText('1 item left')).toBeInTheDocument();
      
      const clearButton = screen.getByText('Clear completed');
      await user.click(clearButton);
      
      expect(screen.queryByText('Todo 1')).not.toBeInTheDocument();
      expect(screen.getByText('Todo 2')).toBeInTheDocument();
      expect(screen.queryByText('Todo 3')).not.toBeInTheDocument();
      expect(screen.getByText('1 item left')).toBeInTheDocument();
    });

    it('should hide clear completed button when no completed todos', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const input = screen.getByPlaceholderText('What needs to be done?');
      await user.type(input, 'Active todo');
      await user.keyboard('{Enter}');
      
      expect(screen.queryByText('Clear completed')).not.toBeInTheDocument();
      
      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);
      
      expect(screen.getByText('Clear completed')).toBeInTheDocument();
    });
  });

  describe('Counter', () => {
    it('should show correct singular/plural text', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const input = screen.getByPlaceholderText('What needs to be done?');
      
      expect(screen.getByText('0 items left')).toBeInTheDocument();
      
      await user.type(input, 'Single todo');
      await user.keyboard('{Enter}');
      expect(screen.getByText('1 item left')).toBeInTheDocument();
      
      await user.type(input, 'Second todo');
      await user.keyboard('{Enter}');
      expect(screen.getByText('2 items left')).toBeInTheDocument();
    });
  });
}); 