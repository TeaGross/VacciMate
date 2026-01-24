import styled from 'styled-components';

export const PrimaryButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 2.5rem;
    padding: 0.5rem 1rem;
    background-color: #311811;
    border: none;
    border-radius: 0.7rem;
    color: #FAF9F5;
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    gap: 0.4rem;

    &:hover{
        background-color: black;
    }

    span {
        display: none;
    }

    @media (min-width: 768px) {
        span {
        display: inline;
        }
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


export const TertiaryButton = styled(PrimaryButton)`
    background-color: transparent;
    border: none;
    color: black;

    &:hover{
        background-color: #3118111d;
        color: black;
    }
`;

export const DeleteButton = styled(PrimaryButton)`
    background-color: #7f1717;
    border: none;
    color: white;

    &:hover{
        background-color: #5b1e1e;
        color: white;
    }
`;