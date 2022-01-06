import React from 'react';
import { screen, render } from '@testing-library/react';
import { IntroHeader } from './intro-header';

test('test IntroHeader', () => {
    render(<IntroHeader title={'Open Intro Title'} subtitle={'This is the subtitle'} />);
    const introheader = screen.getByTestId('intro-header');
    expect(introheader).toBeInTheDocument();
    expect(introheader).toHaveTextContent('Open Intro Title');
    expect(introheader).toHaveTextContent('This is the subtitle');
});
