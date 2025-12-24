interface SubtitleProps {
  text: string;
}

export const Subtitle = ({ text }: SubtitleProps) => {
  return (
    <h2
      style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#e5e7eb',
        marginBottom: '1rem',
        textAlign: 'center',
      }}
    >
      {text}
    </h2>
  );
};
