import { React } from 'react';

declare namespace JSX {
    interface DetailedHTMLProps extends
    HTMLAttributes<HTMLTableRowElement, HTMLTableRowElement>{
        dataLevel?: string;
    }

    interface IntrinsicElements {
        button: ExtendedButton;
    }
}