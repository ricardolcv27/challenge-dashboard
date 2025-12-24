interface TitleProps {
  text: string;
}

export const Title = ({ text }: TitleProps) => {
  return (
    <h1
      style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#1f2937',
        textAlign: 'center',
      }}
    >
      {text}
    </h1>
  );
};
