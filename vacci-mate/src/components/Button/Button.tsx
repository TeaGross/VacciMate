import styled from 'styled-components';

export const PrimaryButton = styled.button`
    min-width: 9rem;
    min-height: 2.5rem;
    padding: 0.5rem 1rem;
    background-color: #311811;
    border: none;
    border-radius: 0.7rem;
    color: #FFF1B2;
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    cursor: pointer;

    &:hover{
        background-color: black;
    }
`;

export const SecondaryButton = styled(PrimaryButton)`
    background-color: transparent;
    border: 2px solid #311811;
    color: black;

    &:hover{
        background-color: #3118111d;
        color: black;
    }
`;

export const LinkButton = styled(PrimaryButton)`
    background-color: transparent;
    border: none;
    color: black;

    &:hover{
        background-color: #3118111d;
        color: black;
    }
`;