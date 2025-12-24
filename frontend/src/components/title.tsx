interface TitleProps {
  text: string;
}

export const Title = ({ text }: TitleProps) => {
  return (
    <h1
      style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#f3f4f6',
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      {text}
    </h1>
  );
};
