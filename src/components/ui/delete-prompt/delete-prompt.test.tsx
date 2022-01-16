import React from 'react';
import { render, screen } from '@testing-library/react';
import DeletePrompt from './delete-prompt';

test('test delete dialog', () => {
    // Act
    render(
        <DeletePrompt
            open={true}
            title={'Delete Test'}
            description={'Wanna delete?'}
            handleClose={() => null}
            handleDeletion={() => null}
        />
    );

    // Assert
    const deletePrompt = screen.getByTestId('delete-prompt-test');
    expect(deletePrompt).toBeInTheDocument();
    expect(deletePrompt).toHaveTextContent('Delete Test');
});
