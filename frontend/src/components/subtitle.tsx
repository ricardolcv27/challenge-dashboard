interface SubtitleProps {
  text: string;
}

export const Subtitle = ({ text }: SubtitleProps) => {
  return (
    <h2
      style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '1rem',
      }}
    >
      {text}
    </h2>
  );
};
