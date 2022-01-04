import React from 'react';
import { screen, render } from '@testing-library/react';
import DeletePrompt from './delete-prompt';

test('test delete dialog', () => {
    render(
        <DeletePrompt
            open={true}
            title={'Delete Test'}
            description={'Wanna delete?'}
            handleClose={() => null}
            handleDeletion={() => null}
        />
    );
    const deletePrompt = screen.getByTestId('delete-prompt-test');
    expect(deletePrompt).toBeInTheDocument();
    expect(deletePrompt).toHaveTextContent('Delete Test');
});
