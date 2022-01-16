import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntroHeader } from './intro-header';

test('test IntroHeader', () => {
    // Act
    render(<IntroHeader title={'Open Intro Title'} subtitle={'This is the subtitle'} />);

    // Assert
    const introHeader = screen.getByTestId('intro-header');
    expect(introHeader).toBeInTheDocument();
    expect(introHeader).toHaveTextContent('Open Intro Title');
    expect(introHeader).toHaveTextContent('This is the subtitle');
});
